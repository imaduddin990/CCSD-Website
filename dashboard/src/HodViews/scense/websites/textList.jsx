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

const TextList = () => {
    const API_BASE_URL = 'http://localhost:8082';
    const token = localStorage.getItem('jwtToken');
    const textname = localStorage.getItem('textName');
//    const [teamDetails, setTeamDetails] = useState([]);
 // State for Website Images
 // const [websiteImages, setWebsiteImages] = useState([]);
  const [WebsiteTexts, setPostShortDescription] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
      // Fetch all products from the API
      fetch(`${API_BASE_URL}/api/website-texts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        setPostShortDescription(data);
      })
      .catch(error => console.error('Error fetching products:', error));
    }, []);


    const handleDelete = (id) => {
        // Make the DELETE request to the backend API
        axios.delete(`${API_BASE_URL}/api/website-texts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token if needed for authorization
            },
        })
        .then((response) => {
            // Handle success response
            console.log("Image deleted:", response.data);
            // Update the state to remove the deleted user from the teamDetails
            setPostShortDescription((prevDetails) => prevDetails.filter(text => text.id !== id));
        })
        .catch((error) => {
            // Handle error
            console.error("Error deleting user:", error);
        });
    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "title", headerName: "TITLE", flex: 1, cellClassName: "name-column--cell" },
        { field: "postShortDescription", headerName: "DESCRIPTION", flex: 1 },
        { field: "status", headerName: "STATUS", flex: 1 },
        { field: "tag", headerName: "TAG", flex: 1 },
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

    // Map the teamDetails to match the DataGrid row structure
    const rows = WebsiteTexts.map((text) => {
        // Ensure `userId` is set as a unique id
        const textId = text.id || `user-${Math.random()}`; // Fallback if userId is undefined
        const name = text.title || "Unknown Name"; // && user.lastName ? `${user.firstName} ${user.lastName}` : "Unknown Name"; // Handle undefined names

        return {
               id: textId, // Use `imageId` as a unique identifier
               title: text.title, // Use `title` for the n    ame field
               status: text.status || "N/A", // Fallback to "N/A" if email is missing
               tag: text.tag || "N/A",
               postShortDescription: text.postShortDescription || "N/A"};
    });

    return (
        <Box>
            <Header title="Text" subtitle="List of Text" />
            <Box>
                <DataGrid
                    rows={rows} // Use the mapped rows here
                    columns={columns}
                    pageSize={12}
                />
            </Box>
            <Link to="/website-text-admin" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 2 }}>
                        <Button
                            startIcon={<PersonAddAltOutlinedIcon />}
                            justifyContent="center"
                            variant="contained"
                            size="large"
                            color="success"
                        >
                            Add Website Text
                        </Button>
                    </Box>
                </Grid>
            </Link>
        </Box>
    );
};

export default TextList;
