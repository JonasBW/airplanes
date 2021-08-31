$(document).ready(function() {
    getAllPlanes();
    var bAdd = false;
    $('#addNew').click(function() {
        bAdd = true;
        ClearModal("edit_modal");
    })
    $('#airplaneTable').on('click', 'tbody tr td button', function(e) {
        e.preventDefault();
        var table = $('#airplaneTable').DataTable();
        let rowData = table.row($(this).parents('tr')).data();

        if ($(this).data('action') == "edit") {
            bAdd = false;
            $('#id').val(rowData.id);
            $('#airplaneType').val(rowData.airplaneType);
            $('#airplanePlateNo').val(rowData.airplanePlateNo);
            $('#currentAirfield').val(rowData.currentAirfield);
            $('#fuel').val(rowData.fuel);
        } else if ($(this).data('action') == "fly") {
            $('#id').val(rowData.id);
            $('#airplaneType').val(rowData.airplaneType);
            $('#airplanePlateNo').val(rowData.airplanePlateNo);
            $('#currentAirfieldFly').val(rowData.currentAirfield);
            $('#fuel').val(rowData.fuel);
        } else if ($(this).data('action') == "fuelUp") {
            var airplaneInformation = JSON.stringify({
                id: rowData.id,
                airplaneType: rowData.airplaneType,
                airplanePlateNo: rowData.airplanePlateNo,
                currentAirfield: rowData.currentAirfield,
                fuel: 5
            })
            $.ajax({
                url: 'http://localhost:8080/api/airplane/',
                type: 'PUT',
                contentType: 'application/json',
                dataType: "json",
                data: airplaneInformation,
                success: function(result) {
                    //                        reloadAirplanes();
                },
                error: function(jqXHR, status, error) {
                    var a = JSON.parse(jqXHR.responseText);
                    console.log(a, status, error);
                    window.alert(jqXHR.status + " : " + a.message);
                }
            });
        } else if ($(this).data('action') == "delete") {
            var con = window.confirm("Are you sure you want to delete this airplane?");
            if (con) {
                $.ajax({
                    url: 'http://localhost:8080/api/airplane/',
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(rowData),
                    success: function(status) {
                        console.log("done");
                    },
                    error: function(jqXHR, status, error) {
                        var a = JSON.parse(jqXHR.responseText);
                        console.log(a, status, error);
                        window.alert(jqXHR.status + " : " + a.message);
                    }
                });
            }
        }
        reloadAirplanes();
    });

    $("#saveAirplane").on('click', function(e) {
        var methodUsed = 'PUT';
        var urlAddEdit = 'http://localhost:8080/api/airplane/';
        if (bAdd == true) {
            methodUsed = 'POST';
            console.log(bAdd);
        }

        if (!validate()) return;
        e.preventDefault();
        var selectedAirfield = $('#currentAirfield option:selected').val();

        var airplaneInformation = JSON.stringify({
            id: $("#id").val(),
            airplaneType: $("#airplaneType").val(),
            airplanePlateNo: $('#airplanePlateNo').val(),
            currentAirfield: selectedAirfield,
            fuel: $('#fuel').val()
        })

        $.ajax({
            url: urlAddEdit,
            type: methodUsed,
            contentType: 'application/json',
            dataType: "json",
            data: airplaneInformation,
            success: function(result) {
                reloadAirplanes();
            },
            error: function(jqXHR, status, error) {
                var a = JSON.parse(jqXHR.responseText);
                console.log(a, status, error);
                window.alert(jqXHR.status + " : " + a.message);
            }
        });
        bAdd = false;
    });


    $("#saveFly").on('click', function(e) {
        var methodUsed = 'PUT';
        var urlAddEdit = 'http://localhost:8080/api/airplane/';
        if (!validate()) return;
        e.preventDefault();

        var selectedAirfield = $('#newAirfieldFly option:selected').val();
        var fuelAmount = 0;
        if ($('#newAirfieldFly option:selected').val() == $('#currentAirfieldFly option:selected').val()) {
            window.alert("Please select a different destination.");
            return;
        }

        if (parseInt($('#fuel').val()) >= 2) {
            fuelAmount = parseInt($('#fuel').val()) - 2;
        } else {
            window.alert("Not enough fuel, you need to fuel up first.");
            return;
        }

        var airplaneInformation = JSON.stringify({
            id: $("#id").val(),
            airplaneType: $("#airplaneType").val(),
            airplanePlateNo: $('#airplanePlateNo').val(),
            currentAirfield: selectedAirfield,
            fuel: fuelAmount
        })

        $.ajax({
            url: 'http://localhost:8080/api/airplane/',
            type: 'PUT',
            contentType: 'application/json',
            dataType: "json",
            data: airplaneInformation,
            success: function(result) {
                reloadAirplanes();
            },
            error: function(jqXHR, status, error) {
                var a = JSON.parse(jqXHR.responseText);
                console.log(a, status, error);
                window.alert(jqXHR.status + " : " + a.message);
            }
        });
    });

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
                [1, "asc"]
            ],
            data: data,
            columns: [
                { data: "id", title: "id", visible: false },
                { data: "airplanePlateNo", title: "Airplane Id" },
                { data: "airplaneType", title: "Plane Type" },
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

function reloadAirplanes() {
    if ($.fn.dataTable.isDataTable('#airplaneTable')) {
        $('#airplaneTable').DataTable().destroy();
        $('#airplaneTable').empty();
        getAllPlanes();
    }
}

function ClearModal(modalId) {
    $(document.getElementById(modalId))
        .find("input[type=text],select")
        .val('')
        .end()
}

function validate() {
    var error = [];
    var arrNames = [];
    var form = document.getElementById('update_form');
    for (var i = 0; i < form.elements.length; i++) {
        arrNames.push(form.elements[i].name);

        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            if (form.elements[i].type === "radio" && !arrNames.includes(form.elements[i].name)) {
                alert('There are some required fields marked in red you have not filled!');
                console.log(form.elements[i].type);
                return false;
            }
            alert('There are some required fields marked in red you have not filled!');
            //            console.log(form.elements[i].type);
            return false;
        }
    }
    return true;
}