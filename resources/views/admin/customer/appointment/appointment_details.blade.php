@extends("admin_layout")
@section("admin_main")

    <div class="card-content">
        <?php $message = Session::get("message_edit")?>
        @if($message)
            <div class="alert alert-success col-sm-6">{{$message}}</div>
        @endif
        <?php Session::put("message_edit","")?>
    </div>
    <div class="card">
        <div class="card-header">
            <div class="buttons float-sm-end">
                @if($edit == true)
                    <button form="edit-appointment" type="submit" class="btn btn-primary">Save</button>
                    <a href="{{url("/admin/appointment-details/".$appointment->appointment_id)}}" class="btn btn-warning">Cancel</a>
                @else
                    <a href="{{url("/admin/appointment-details/edit-appointment/".$appointment->appointment_id)}}" class="btn btn-primary">Edit</a>
                @endif
            </div>
            <h4 class="card-title">Appointment details </h4>
        </div>
        <section class="content">
            <div class="container-fluid">
                <div class="card-body">
                    <div class="row">
                        <form id="edit-appointment" action="{{url("/admin/appointment-details/update-appointment/".$appointment->appointment_id)}}" method="post">
                            @csrf
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Staff</label>
                                        <input type="text" name="appointment_staff" class="form-control" @if(!$edit) disabled @endif value="{{$appointment->appointment_staff}}"/>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Purpose</label>
                                        <input type="text" name="appointment_purpose" class="form-control" @if(!$edit) disabled @endif value="{{$appointment->appointment_purpose}}"/>
                                        @error("appointment_purpose")
                                        <p class="text-danger">{{$message}}</p>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Project</label>
                                        <input type="text" name="appointment_project" class="form-control" @if(!$edit) disabled @endif value="{{$appointment->appointment_project}}"/>
                                        @error("appointment_project")
                                        <p class="text-danger">{{$message}}</p>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Status</label>
                                        <input type="text" name="appointment_status" class="form-control" @if(!$edit) disabled @endif value="{{$appointment->appointment_status}}"/>
                                        @error("appointment_status")
                                        <p class="text-danger">{{$message}}</p>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

@endsection
