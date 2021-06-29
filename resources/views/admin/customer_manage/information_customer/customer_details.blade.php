@extends("admin_layout")
@section("admin_main")

    <div class="card">
        <div class="card-header">
                <h4 class="card-title">Customer details</h4>
        </div>
        <div class="card-content">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-lg-3">
                        <div class="card">
                            <div class="card-body py-4 px-5">
                                <div class="d-flex align-items-center">
                                    <div class="avatar avatar-xl">
                                        <img src="{{asset("assets/images/faces/1.jpg")}}" alt="Face 1">
                                    </div>
                                    <div class="ms-3 name">
                                        @foreach($customers as $customer)
                                            <h5 class="font-bold">{{$customer->customer_name}}</h5>
                                            <h6 class="text-muted mb-0">{{$customer->customer_phone}}</h6>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-9">
                        <div class="row">
                            <div class="col-sm-6">
                                <form name="{{url("/customer_details")}}" method="get">
                                    <select name="form-control-sm">
                                        <option value="0">Select relationship</option>
{{--                                        @foreach()--}}
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


@endsection
