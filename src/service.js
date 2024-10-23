import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

const CustomTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Ahmed",
      age: 25,
      city: "Islamabad",
      phone: "03001234567",
      email: "ahmed@example.com",
    },
    {
      id: 2,
      name: "Ali",
      age: 23,
      city: "Lahore",
      phone: "03012345678",
      email: "ali@example.com",
    },
    {
      id: 3,
      name: "Huraira",
      age: 21,
      city: "Karachi",
      phone: "03022345678",
      email: "huraira@example.com",
    },
    {
      id: 4,
      name: "Asad",
      age: 44,
      city: "Islamabad",
      phone: "03032345678",
      email: "asad@example.com",
    },
    {
      id: 5,
      name: "Hamza",
      age: 48,
      city: "Abbotabad",
      phone: "03042345678",
      email: "hamza@example.com",
    },
    {
      id: 6,
      name: "Huzaifa",
      age: 34,
      city: "Mansehra",
      phone: "03052345678",
      email: "huzaifa@example.com",
    },
    {
      id: 7,
      name: "Ibrahim",
      age: 54,
      city: "Murree",
      phone: "03062345678",
      email: "ibrahim@example.com",
    },
    {
      id: 8,
      name: "Saad",
      age: 45,
      city: "Kashmir",
      phone: "03072345678",
      email: "saad@example.com",
    },
    {
      id: 9,
      name: "Talha",
      age: 66,
      city: "Khanewal",
      phone: "03082345678",
      email: "talha@example.com",
    },
    {
      id: 10,
      name: "Umer",
      age: 22,
      city: "Muzaffarabad",
      phone: "03092345678",
      email: "umer@example.com",
    },
  ]);

  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // State for adding a new row
  const [newRowData, setNewRowData] = useState({
    name: "",
    age: "",
    city: "",
    phone: "",
    email: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // State for delete confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // State for edit confirmation
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleDelete = (id) => {
    setRowToDelete(id); // Set the row to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete)); // Delete the row
    setOpenDeleteDialog(false); // Close the dialog
    setRowToDelete(null); // Reset the row to delete
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog
    setRowToDelete(null); // Reset the row to delete
  };

  const handleEdit = (id) => {
    const rowData = rows.find((row) => row.id === id);
    setEditingRowId(id);
    setEditingRowData(rowData);
    setOpenEditDialog(true); // Open the edit dialog
  };

  const confirmEdit = () => {
    setRows(
      rows.map((row) => (row.id === editingRowId ? editingRowData : row))
    );
    setOpenEditDialog(false);// Close the dialog
    setEditingRowId(null); // Reset editing row id
    setEditingRowData({}); // Reset editing row data
  };

  const handleAddOpen = () => {
    setOpenAddDialog(true);
  };

    const handleAddSave = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    const newRow = { id: newId, ...newRowData };
    setRows([...rows, newRow]);
    setOpenAddDialog(false);
    setNewRowData({ name: "", age: "", city: "", phone: "", email: "" });
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "custom-header",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "custom-header",
      width: 150,
    },
    {
      field: "age",
      headerName: "Age",
      headerClassName: "custom-header",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      headerClassName: "custom-header",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "custom-header",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "custom-header",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)} // Call handleDelete on delete icon click
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "60px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <h2 style={{ margin: 0 }}>User Details</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton
            color="primary"
            onClick={handleAddOpen}
            style={{ marginLeft: "8px" }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Box>
      <div style={{ height: 450, width: "100%", border: "1px solid #ccc" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "blue",
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      {/* Dialog for adding a new row */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={newRowData.name}
            onChange={(e) =>
              setNewRowData({ ...newRowData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            variant="outlined"
            type="number"
            value={newRowData.age}
            onChange={(e) =>
              setNewRowData({ ...newRowData, age: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="outlined"
            value={newRowData.city}
            onChange={(e) =>
              setNewRowData({ ...newRowData, city: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="outlined"
            value={newRowData.phone}
            onChange={(e) =>
              setNewRowData({ ...newRowData, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={newRowData.email}
            onChange={(e) =>
              setNewRowData({ ...newRowData, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSave}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={editingRowData.name}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            variant="outlined"
            type="number"
            value={editingRowData.age}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, age: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="outlined"
            value={editingRowData.city}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, city: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="outlined"
            value={editingRowData.phone}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={editingRowData.email}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={confirmEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for deletion */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomTable;
