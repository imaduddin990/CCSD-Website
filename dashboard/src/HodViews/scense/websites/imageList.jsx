import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../../base/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';

const ImageList = () => {
    const API_BASE_URL = 'http://localhost:8082';
    const token = localStorage.getItem('jwtToken');

    const [websiteImages, setWebsiteImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for update

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/WebsiteImage`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => setWebsiteImages(data))
        .catch(error => console.error('Error fetching images:', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${API_BASE_URL}/api/WebsiteImage/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(() => {
            setWebsiteImages((prevDetails) => prevDetails.filter(image => image.id !== id));
        })
        .catch(error => console.error("Error deleting image:", error));
    };

    const handleUpdateClick = (image) => {
        setSelectedImage(image); // Set the selected image for updating
    };

    const handleUpdateSave = (updatedTitle) => {
        // Simulate API update logic here if needed
        console.log(`Updated title for image ID ${selectedImage.id}:`, updatedTitle);
        setSelectedImage(null); // Close the update popup
    };

    const UpdatePopup = ({ row, onUpdate }) => {
        const [open, setOpen] = useState(false);
        const [title, setTitle] = useState(row?.title || "");
        const [tag, setTag] = useState(row?.tag || "");

        const handleUpdateClick = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleSave = () => {
            // Call onUpdate to pass updated data back to parent
            onUpdate(row.id, { title, tag });
            setOpen(false);
        };

        return (
            <div>
                <EditOutlinedIcon onClick={handleUpdateClick} sx={{ ml: "10px", cursor: "pointer" }} />

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Update Image Details</DialogTitle>
                    <DialogContent>
                        <Typography sx={{ mb: 2 }}>Enter the new title and description:</Typography>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                        <Button onClick={handleSave} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
// Parent component logic for updating
// Parent component logic for updating
const handleUpdate = (id, updatedData) => {
    axios.put(`${API_BASE_URL}/api/WebsiteImage/${id}`, updatedData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure content type is set
        },
    })
    .then((response) => {
        console.log("Image updated:", response.data);

        // Update the state with the actual data returned from the API
        setWebsiteImages((prevImages) =>
            prevImages.map((img) =>
                img.id === id ? { ...img, ...response.data } : img
            )
        );
    })
    .catch((error) => {
        console.error("Error updating image:", error);
    });
};


    const columns = [
        { field: "title", headerName: "TITLE", flex: 1 },
        { field: "date", headerName: "DATE", flex: 1 },
        { field: "tag", headerName: "DESCRIPTION", flex: 1 },
        { field: "status", headerName: "STATUS", flex: 1 },
        {
            field: "actions",
            headerName: "ACTIONS",
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <DeleteOutlinedIcon onClick={() => handleDelete(row.id)} />
                    <UpdatePopup row={row} onUpdate={handleUpdate} />
                </Box>
            ),
        },
    ];

    const rows = websiteImages.map((image) => ({
        id: image.id,
        title: image.title || "Untitled",
        date: image.date || "N/A",
        status: image.status || "N/A",
        tag: image.tag || "N/A",
        image: image.image ? `data:image/jpeg;base64,${image.image}` : null,
    }));

    return (
        <Box>
            <Header title="Image" subtitle="List of Images" />
            <Box>
                <DataGrid rows={rows} columns={columns} pageSize={12} />
            </Box>
            <Link to="/website-image-admin" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 2 }}>
                        <Button
                            startIcon={<PersonAddAltOutlinedIcon />}
                            variant="contained"
                            size="large"
                            color="success"
                        >
                            Add Website Image
                        </Button>
                    </Box>
                </Grid>
            </Link>
            {selectedImage && (
                <UpdatePopup
                    open={Boolean(selectedImage)}
                    onClose={() => setSelectedImage(null)}
                    onSave={(updatedTitle) => handleUpdateSave(updatedTitle)}
                    title={selectedImage.title}
                />
            )}
        </Box>
    );
};

export default ImageList;
