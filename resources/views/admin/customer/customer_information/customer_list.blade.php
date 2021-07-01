@extends("admin_layout")
@section("admin_main")
<section class="input-group-select">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Search customer</h4>
                    <div class="col-sm-12" style="margin-top: 30px">
                        <form action="{{url("/admin/customers")}}" method="get">
                            <div class="row">
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="basicInput" placeholder="Search">
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-select" id="basicSelect">--}}
                                        <option selected="">Choose phone customer</option>
                                        @foreach($customers as $customer)
                                            <option @if(app("request")->input("customer_id")==$customer->customer_id) selected @endif value="{{$customer->customer_id}}">{{$customer->customer_phone}}</option>
                                        @endforeach
                                    </select>
                                </div>
{{--                                <div class="col-sm-6">--}}
{{--                                    <select class="form-select" id="basicSelect">--}}
{{--                                        <option selected="">Choose staff in charge</option>--}}
{{--                                        @foreach($staffs as $staff)--}}
{{--                                            <option @if(app("request")->input("staff_id")==$staff->staff_id) selected @endif value="{{$staff->staff_id}}">{{$staff->staff_name}}</option>--}}
{{--                                        @endforeach--}}
{{--                                    </select>--}}
{{--                                </div>--}}
                            </div>
                            <p></p>
                            <div><button class="btn btn-primary btn-sm" type="submit">Search</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="input-group-select">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="buttons float-md-end">
                        <a href="{{url("/admin/create-customer")}}" class="btn btn-primary">Add new customer</a>
                    </div>
                    <h4 class="card-title">Manage customer</h4>
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
                            <th>StaffID</th>
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
                                <td>{{$item->staff_id}}</td>
                                <td>
                                    <button class="btn btn-primary"><a style="color: white" href="{{url("/admin/appointments/".$item->customer_id)}}">View</a> </button>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
{{--                    {!! $customers->appends(request()->input())->links("vendor.pagination.default") !!}--}}

                </div>
            </div>
        </div>
    </div>
@endsection
