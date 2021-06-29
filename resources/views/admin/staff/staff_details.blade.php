@extends("admin_layout")
@section("admin_main")
    <?php $message = Session::get("message_success") ?>
    @if($message)
        <div class="alert alert-success col-sm-6">{{$message}}</div>
    @endif
    <?php Session::put("message_success", "") ?>
    <div class="card">
        <div class="card-header">
            <div class="buttons float-md-end">
                @if($edit == true)
                    <button form="form-edit" class="btn btn-primary">Save</button>
                    <a href="{{url("admin/manage-staffs/".$staff->staff_id."/details")}}" class="btn btn-warning">Cancel</a>
                @else
                    <a href="{{url("admin/manage-staffs/".$staff->staff_id."/edit")}}" class="btn btn-primary">Edit</a>
                @endif
            </div>

            <h4 class="card-title">Staff Information </h4>
        </div>

        <div class="card-body">
            <div class="row">

                <form id="form-edit" class="col-sm-12" action="{{url("/admin/manage-staffs/".$staff->staff_id."/update")}}" method="post">
                    @csrf
                    <div class="row">
                        <div class="col-sm-6">
                            <h6>Staff name</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" name="staff_name" @if(!$edit) disabled @endif class="form-control"
                                       value="{{$staff->staff_name}}">
                                <div class="form-control-icon">
                                    <i class="bi bi-person"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Birthday</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" @if(!$edit) disabled @endif name="staff_birthday"
                                       value="{{$staff->staff_birthday}}">
                                <div class="form-control-icon">
                                    <i class="fas fa-birthday-cake"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Email</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" @if(!$edit) disabled @endif name="staff_email"
                                       value="{{$staff->staff_email}}">
                                <div class="form-control-icon">
                                    <i class="bi bi-envelope"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Phone</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" @if(!$edit) disabled @endif name="staff_phone"
                                       value="{{$staff->staff_phone}}">
                                <div class="form-control-icon">
                                    <i class="bi bi-telephone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Department</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" disabled name="department_id"
                                       value="{{$staff->department_id}}">
                                <div class="form-control-icon">
                                    <i class="bi bi-person"></i>
                                </div>
                            </div>
                        </div>
                         <div class="col-sm-6">
                            <h6>Address</h6>
                            <div class="form-group position-relative has-icon-left">
                                <textarea class="form-control" style="resize: none" cols="10" @if(!$edit) disabled @endif name="staff_address"
                                >{{$staff->staff_address}}</textarea>
                                <div class="form-control-icon">
                                    <i class="fas fa-house-user"></i>
                                </div>
                            </div>
                        </div>


                    </div>

                </form>

            </div>
        </div>

    </div>
@endsection
