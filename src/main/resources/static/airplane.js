$(function() {
    getAllPlanes();
})

function getAllPlanes() {
    $.ajax({
        url: 'http://localhost:8080/api/airplane/',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#airplaneTable').dataTable({
            order: [
                [2, "asc"]
            ],
            data: data,
            columns: [
                { data: "id", title: "id", visible: false },
                { data: "airplaneType", title: "Plane Type" },
                { data: "airplanePlateNo", title: "Airplane Id" },
                { data: "currentAirfield", title: "Current Airfield" },
                { data: "fuel", title: "Fuel in Ton" },
                {
                    title: "Fuel Up",
                    data: "id",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="fuelUp" class="btn btn-sm btn-info" data-toggle="modal" data-target="#fuel_modal" data-id="' + row.id + '">Fuel Up</button>';
                    }
                },
                {
                    title: "Fly",
                    data: "id",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="edit" class="btn btn-sm btn-info" data-toggle="modal" data-target="#fly_modal" data-id="' + row.id + '">Fly</button>';
                    }
                },
                {
                    title: "Edit",
                    data: "id",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="edit" class="btn btn-sm btn-info" data-toggle="modal" data-target="#edit_modal" data-id="' + row.id + '">Edit</button>';
                    }
                },
                {
                    title: "Delete",
                    data: "id",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="delete" class="btn btn-sm btn-info" data-id="' + row.id + '">Delete</button>';
                    }
                }
            ]
        })
    });
}