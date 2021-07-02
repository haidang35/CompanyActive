@extends("admin_layout")
@section("admin_main")
    <div class="card">
        <div class="card-header">
            <div class="buttons float-md-end">
                <a href="{{url("/admin/customers/create-customer")}}" class="btn btn-primary">Add new customer</a>
            </div>
            <h4 class="card-title">Manage customers</h4>
            <div class="col-sm-12" style="margin-top: 30px">
                <form action="{{url("/admin/customers")}}" method="get">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" name="customer_name"
                                       placeholder="Search customer">
                                <div class="form-control-icon">
                                    <i class="bi bi-search"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" class="form-control" name="customer_phone"
                                       placeholder="Search phone">
                                <div class="form-control-icon">
                                    <i class="bi bi-search"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="form-control form-select" name="staff_id">
                                <option value="0">Select Staff</option>
                                @foreach($staffs as $item)
                                    <option @if(app("request")->input("staff_id") == $item->staff_id) selected @endif value="{{$item->staff_id}}">{{$item->staff_name}}</option>
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
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Relationship</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($customers as $item)
                            <tr>
                                <td>{{$loop->index + 1}}</td>
                                <td>{{$item->customer_name}}</td>
                                <td>{{$item->customer_phone}}</td>
                                <td>{{$item->customer_address}}</td>
                                <td>{{$item->customer_relationship}}</td>
                                <td>
                                    <button class="btn btn-primary"><a style="color: white" href="{{url("/admin/customer-details/".$item->customer_id)}}">View</a> </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger"><a style="color: white" onclick="return confirm('Are you sure delete {{$item->customer_name}}?')" href="{{url("/admin/customers/delete-customer/".$item->customer_id)}}">Delete</a></button>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
