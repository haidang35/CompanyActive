@extends("admin_layout")
@section("admin_main")
    <div class="card col-sm-8">
        <div class="card-header">
            <h4 class="card-title">Add new staff </h4>
        </div>
        <div class="card-body">
            <div class="row">
                <form class="col-sm-12" action="{{url("/admin/manage-staffs/new-staff")}}" method="post">
                    @csrf
                    <div class="row">
                        <div class="col-sm-6">
                            <h6>Staff name</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" name="staff_name" class="form-control"
                                       >
                                <div class="form-control-icon">
                                    <i class="bi bi-person"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Birthday</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="date" class="form-control" name="staff_birthday"
                                       >
                                <div class="form-control-icon">
                                    <i class="fas fa-birthday-cake"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Email</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="email" class="form-control" name="staff_email"
                                       >
                                <div class="form-control-icon">
                                    <i class="bi bi-envelope"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Phone</h6>
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" name="staff_phone"
                                       >
                                <div class="form-control-icon">
                                    <i class="bi bi-telephone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Department</h6>
                            <div class="form-group position-relative has-icon-left">
                                <select class="form-control form-select">
                                    <option>Select department</option>
                                    @foreach($departments as $item)
                                        <option value="{{$item->department_id}}">{{$item->department_name}}</option>
                                    @endforeach

                                </select>
                                <div class="form-control-icon">
                                    <i class="bi bi-person"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h6>Address</h6>
                            <div class="form-group position-relative has-icon-left">
                                <textarea class="form-control" style="resize: none" cols="10" name="staff_address"
                                ></textarea>
                                <div class="form-control-icon">
                                    <i class="fas fa-house-user"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons float-md-end">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>

            </div>

        </div>

    </div>
@endsection

