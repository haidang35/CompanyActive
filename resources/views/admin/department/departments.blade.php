
@extends("admin_layout")
@section("admin_main")
    <?php $message = Session::get("message_success") ?>
    @if($message)
        <div class="alert alert-success col-sm-6">{{$message}}</div>
    @endif
    <?php Session::put("message_success", "") ?>
    <div>
        <?php $department_delete = Session::get("department_delete") ?>
        @if($department_delete)
            <div class="alert alert-warning col-sm-5">
                <span>You can restore department {{$department_delete->department_name}}</span>
                <a href="{{url("admin/manage-departments/restore/".$department_delete->department_id)}}" class="btn btn-primary" style="margin-left: 20px">Restore</a>
            </div>

        @endif
        <?php Session::put("department_delete", "") ?>
    </div>
    <div class="card">
        <div class="card-header">
            <div class="buttons float-md-end">
                <a href="{{url("admin/manage-departments/add-new")}}" class="btn btn-primary">Add new department</a>
            </div>
            <h4 class="card-title">Mange departments</h4>
            <div class="col-sm-12" style="margin-top: 30px">
                <form action="{{url("admin/manage-departments")}}" method="get">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" name="department_search"
                                       placeholder="Search ...">
                                <div class="form-control-icon">
                                    <i class="bi bi-search"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="form-control form-select" name="select_code">
                                <option value="0">Select code</option>
                                @foreach($data_scope as $item)
                                    <option @if(app("request")->input("select_code") == $item->department_code ) selected @endif value="{{$item->department_code}}">{{$item->department_code}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <select class="form-control form-select" name="select_pic">
                                <option value="0">Select Pic</option>
                                @foreach($data_scope as $item)
                                    <option @if(app("request")->input("select_pic") == $item->department_pic) selected @endif value="{{$item->department_pic}}">{{$item->department_pic}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <div class="buttons">
                                <button type="submit" class="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card-content">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-lg">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Pic</th>
                            <th>Description</th>
                            <th>Number of members</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($departments as $item)
                            <tr>
                                <td>{{$loop->index + 1}}</td>
                                <td>{{$item->department_name}}</td>
                                <td>{{$item->department_code}}</td>
                                <td>{{$item->department_pic}}</td>
                                <td>{{$item->department_desc}}</td>
                                <td>{{$item->staff_count}}</td>
                                <td>
                                    <div class="buttons">
                                        <a href="{{url("/admin/department-details/".$item->department_id)}}" class="btn btn-primary rounded-pill">View</a>
                                        <a data-bs-toggle="modal" data-bs-target="{{"#danger".$item->department_id}}"  class="btn btn-danger rounded-pill">Delete</a>
                                    </div>

                                </td>
                                @if($item->staff_count == 0)
                                    <div class="modal fade text-left" id="{{"danger".$item->department_id}}" tabindex="-1"
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
                                                    Are you sure delete department {{$item->department_name}}
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button"
                                                            class="btn btn-light-secondary"
                                                            data-bs-dismiss="modal">
                                                        <i class="bx bx-x d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Close</span>
                                                    </button>
                                                    <a href="{{url("admin/manage-departments/delete/".$item->department_id)}}" class="btn btn-danger ml-1"
                                                    >
                                                        <i class="bx bx-check d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Accept</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @else
                                    <div class="modal fade text-left" id="{{"danger".$item->department_id}}" tabindex="-1"
                                         role="dialog" aria-labelledby="myModalLabel120"
                                         aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                                             role="document">
                                            <div class="modal-content">
                                                <div class="modal-header bg-warning">
                                                    <h5 class="modal-title white" id="myModalLabel120">
                                                        Warning !!
                                                    </h5>
                                                    <button type="button" class="close"
                                                            data-bs-dismiss="modal" aria-label="Close">
                                                        <i data-feather="x"></i>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    You must remove all members before deleting department {{$item->department_name}}
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button"
                                                            class="btn btn-light-secondary"
                                                            data-bs-dismiss="modal">
                                                        <i class="bx bx-x d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Close</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endif

                            </tr>

                        @endforeach
                        </tbody>
                    </table>
                </div>
                {{ $departments->appends(request()->input())->links("vendor.pagination.default")  }}
            </div>
        </div>
    </div>
@endsection
