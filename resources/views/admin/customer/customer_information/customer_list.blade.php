@extends("admin_layout")
@section("admin_main")
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-6">
                    <h4 class="card-title">Manage customer</h4>
                </div>
                <div class="col-sm-6">
                    <a style="float: right" href="{{url("/admin/create-customer")}}" class="btn btn-primary">New customer</a>
                </div>
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
                                    <button class="btn btn-primary"><a style="color: white" href="{{url("/customer-details/".$item->customer_id)}}">View</a> </button>
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
