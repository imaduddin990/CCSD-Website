import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
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
import axios from 'axios';

const GalleryList = () => {
    const API_BASE_URL = 'http://localhost:8082';
    const token = localStorage.getItem('jwtToken');
    const galleryname = localStorage.getItem('galleryName');
    //const [image, setImage] = useState(null)
    const [image, setImage] = useState([]); // Set initial state to an empty array

 // State for Website Images
  //const [websiteImages, setWebsiteImages] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
      // Fetch all products from the API
      fetch(`${API_BASE_URL}/api/Gallery`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        setImage(data);
      })
      .catch(error => console.error('Error fetching products:', error));
    }, []);


    const handleDelete = (id) => {
        // Make the DELETE request to the backend API
        axios.delete(`${API_BASE_URL}/api/Gallery/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token if needed for authorization
            },
        })
        .then((response) => {
            // Handle success response
            console.log("Image deleted:", response.data);
            // Update the state to remove the deleted user from the teamDetails
            setImage((prevDetails) => prevDetails.filter(image => image.id !== id));
        })
        .catch((error) => {
            // Handle error
            console.error("Error deleting user:", error);
        });
    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
     //   { field: "Id", headerName: "ID" },
        { field: "title", headerName: "TITLE", flex: 1, cellClassName: "name-column--cell" },
        { field: "date", headerName: "DATE", flex: 1 },
        { field: "tag", headerName: "DESCRIPTION", flex: 1 },
        { field: "status", headerName: "STATUS", flex: 1 },
          {
                 field: "image",
                 headerName: "IMAGE",
                 flex: 1,
                 renderCell: (params) => {
                     return params.value ? (
                         <img
                             src={params.value}
                             alt="Website"
                             style={{ width: 30, height: 30, objectFit: "cover", borderRadius: "4px" }}
                         />
                     ) : (
                         "No Image"
                     );
                 },
             },
        {
            // field: "delete",
            // headerName: "DELETE",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box
                        width="40%"
                        m="0 auto"
                        p="5px"
                        justifyContent="center"
                        alignItems="center"
                        // backgroundColor={row.access === "admin" ? colors.greenAccent[600] : colors.greenAccent[700]}
                        // borderRadius="4px"
                    >
                            {/* delete func here onclick */}


                        <DeleteOutlinedIcon onClick={() => handleDelete(row.id)}/>
                        <Typography variant="body1" color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Delete
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    //Map the teamDetails to match the DataGrid row structure
    const rows = image.map((image) => {
        // Ensure `userId` is set as a unique id
        const imageId = image.id || `user-${Math.random()}`; // Fallback if userId is undefined
        const name = image.title || "Unknown Name";
        return {
               id: imageId, // Use `imageId` as a unique identifier
               title: name, // Use `title` for the n    ame field
               date: image.date || "N/A", // Fallback to "N/A" if phoneNumber is missing
               status: image.status || "N/A", // Fallback to "N/A" if email is missing
               tag: image.tag || "N/A", // Fallback to "N/A" if role is missing
               image:image.image ? `data:image/jpeg;base64,${image.image}` : null
           };
    });

    return (
        <Box>
            <Header title="Gallery" subtitle="List of Image in Gallery" />
            <Box>
                <DataGrid
                    rows={rows} // Use the mapped rows here
                    columns={columns}
                    pageSize={12}
                />
            </Box>
            <Link to="/website-image-gallery" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 2 }}>
                        <Button
                            startIcon={<PersonAddAltOutlinedIcon />}
                            justifyContent="center"
                            variant="contained"
                            size="large"
                            color="success"
                        >
                            Add Website Gallery
                        </Button>
                    </Box>
                </Grid>
            </Link>
        </Box>
    );
};

export default GalleryList;
