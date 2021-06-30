
@extends("admin_layout")
@section("admin_main")
<section id="input-with-icons">
    <div class="row match-height">
        <div class="col-12">
            <div class="card-content">
                <?php $message = Session::get("message_success") ?>
                @if($message)
                    <div class="alert alert-success col-sm-6">{{$message}}</div>
                @endif
                <?php Session::put("message_success", "") ?>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="buttons float-sm-end">
                        @if($edit == true)
                            <button form="form-edit" type="submit" class="btn btn-primary">Save</button>
                            <a href="{{url("/admin/department-details/".$department->department_id)}}" class="btn btn-warning">Cancel</a>
                        @else
                            <a href="{{url("/admin/department-details/edit/".$department->department_id)}}" class="btn btn-primary">Edit</a>
                        @endif

                    </div>
                    <h4 class="card-title">Department details </h4>
                </div>

                <div class="card-body">
                    <div class="row">
                        <form id="form-edit" class="col-sm-12" action="{{url("/admin/department-details/update/".$department->department_id)}}" method="post">
                                @csrf
                                <div class="row">
                                <div class="col-sm-6">
                                    <h6>Department name</h6>
                                    <div class="form-group position-relative has-icon-left">
                                        <input type="text" name="department_name" @if(!$edit) disabled @endif class="form-control"
                                               value="{{$department->department_name}}">
                                        <div class="form-control-icon">
                                            <i class="bi bi-person"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <h6> Code</h6>
                                    <div class="form-group position-relative has-icon-left">
                                        <input type="text" class="form-control" @if(!$edit) disabled @endif name="department_code"
                                               value="{{$department->department_code}}">
                                        <div class="form-control-icon">
                                            <i class="bi bi-person"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <h6>Pic</h6>
                                    <div class="form-group position-relative has-icon-left">
                                        <input type="text" class="form-control" @if(!$edit) disabled @endif name="department_pic"
                                               value="{{$department->department_pic}}">
                                        <div class="form-control-icon">
                                            <i class="bi bi-person"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <h6>Description</h6>
                                    <div class="form-group position-relative has-icon-left">
                                <textarea class="form-control" cols="8" @if(!$edit) disabled @endif name="department_desc"
                                >{{$department->department_desc}}</textarea>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <h6>Members</h6>
                                    <div class="form-group position-relative has-icon-left">
                                        <input type="text" class="form-control" disabled
                                               value="{{$department->staff_count}}"/>
                                        <div class="form-control-icon">
                                            <i class="bi bi-person"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>

            </div>

            <?php $staff_removed = Session::get("staff_removed") ?>
            @if($staff_removed)
                <div class="alert alert-warning col-sm-4">
                    <span>You can restore  {{$staff_removed->staff_name}}</span>
                    <a href="{{url("admin/manage-departments/".$department->department_id."/restore/".$staff_removed->staff_id)}}" class="btn btn-primary" style="margin-left: 40px">Restore</a>
                </div>

            @endif
            <?php Session::put("staff_removed", "") ?>
            <div class="card">
                <div class="card-header">
                    <div class="buttons float-md-end">
                        <a href="{{url("/admin/department/add-member/".$department->department_id)}}" class="btn btn-primary">Add member</a>
                        @if($department->staff_count == 0 && Session::exists("staffs_removed"))
                            <a href="{{url("/admin/manage-departments/".$department->department_id."/restore-members")}}" class="btn btn-warning">Restore members</a>
                        @else
                            <a href="{{url("/admin/department/".$department->department_id."/remove-all")}}" class="btn btn-danger">Remove all</a>
                        @endif

                    </div>
                    <h4 class="card-title">Members</h4>

                </div>
                <div class="card-content">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-lg">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Bithday</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($staffs as $item)
                                    <tr>
                                        <td>{{$loop->index + 1}}</td>
                                        <td>{{$item->staff_name}}</td>
                                        <td>{{$item->staff_birthday}}</td>
                                        <td>{{$item->staff_email}}</td>
                                        <td>{{$item->staff_phone}}</td>
                                        <td>{{$item->staff_address}}</td>
                                        <td>
                                            <div class="buttons">
                                                <a href="{{url("admin/manage-staffs/".$item->staff_id."/details")}}" class="btn btn-primary rounded-pill">View</a>
                                                <a  data-bs-toggle="modal" data-bs-target="{{"#danger".$item->staff_id}}" class="btn btn-danger rounded-pill">Remove</a>
                                            </div>
                                            <div class="modal fade text-left" id="{{"danger".$item->staff_id}}" tabindex="-1"
                                                 role="dialog" aria-labelledby="myModalLabel120"
                                                 aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                                                     role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header bg-danger">
                                                            <h5 class="modal-title white" id="myModalLabel120">
                                                                Warning !!
                                                            </h5>
                                                            <button type="button" class="close"
                                                                    data-bs-dismiss="modal" aria-label="Close">
                                                                <i data-feather="x"></i>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            Are you sure remove member {{$item->staff_name}}
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button"
                                                                    class="btn btn-light-secondary"
                                                                    data-bs-dismiss="modal">
                                                                <i class="bx bx-x d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Close</span>
                                                            </button>
                                                            <a href="{{url("/admin/department/remove-member/".$item->staff_id)}}" class="btn btn-danger ml-1"
                                                            >
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Accept</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                @endforeach
                                </tbody>
                            </table>
                        </div>
                        <div>{{ $staffs->links("vendor.pagination.default")  }}</div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</section>
@endsection
