(
    <div style={{ padding: '66px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="16px">
        <h2 style={{ margin: 0 }}>User Details</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton color="primary" onClick={() => alert('Add new data')} style={{ marginLeft: '8px' }}>
            <AddIcon />
          </IconButton>
        </div>
      </Box>
      <div style={{ height: 450, width: '100%', border: '1px solid #ccc' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    </div>
  );
};
