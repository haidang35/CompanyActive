
@extends("admin_layout")
@section("admin_main")
    <section id="input-with-icons">
        <?php $message = Session::get("message_success") ?>
        @if($message)
            <div class="alert alert-success col-sm-6">{{$message}}</div>
        @endif
        <?php Session::put("message_success", "") ?>
        <div class="row match-height">
            <div class="col-12">
                <div class="card-content">
                </div>
                <div class="card">
                    <div class="card-header">
                        <div class="buttons float-md-end">
                            <a href="{{url("admin/manage-staffs/add-new-staff")}}" class="btn btn-primary">Add new staff</a>
                        </div>
                        <h4 class="card-title">Members</h4>
                        <div class="col-sm-12" style="margin-top: 30px">
                            <form action="{{url("admin/manage-staffs")}}" method="get">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="form-group position-relative has-icon-left">
                                            <input type="text" class="form-control" name="search_value"
                                                   value=""
                                                   placeholder="Search name, phone...">
                                            <div class="form-control-icon">
                                                <i class="bi bi-search"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <select class="form-control form-select" name="department_id">
                                            <option value="0">Select department</option>
                                            @foreach($data_scope as $item)
                                                <option @if(app("request")->input("department_id") == $item->department_id ) selected @endif value="{{$item->department_id}}">{{$item->department_name}}</option>
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
                                        <th>Bithday</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Department</th>
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
                                                @if($item->department_id !== null)
                                                    {{$item->Department->department_name}}
                                                @else
                                                    Không
                                                @endif

                                            </td>
                                            <td>
                                                <div class="buttons">
                                                    <a href="{{url("admin/manage-staffs/".$item->staff_id."/details")}}" class="btn btn-primary rounded-pill">View</a>
                                                    <a data-bs-toggle="modal" data-bs-target="{{"#danger".$item->staff_id}}"  class="btn btn-danger rounded-pill">Delete</a>
                                                </div>
                                            </td>
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
                                                            Are you sure delete member {{$item->staff_name}}
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button"
                                                                    class="btn btn-light-secondary"
                                                                    data-bs-dismiss="modal">
                                                                <i class="bx bx-x d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Close</span>
                                                            </button>
                                                            <a href="{{url("admin/manage-staffs/delete/".$item->staff_id)}}" class="btn btn-danger ml-1"
                                                            >
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block">Accept</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

