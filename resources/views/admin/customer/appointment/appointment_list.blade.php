@extends("admin_layout")
@section("admin_main")
    <section class="input-group-select">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Search customer</h4>
                        <div class="col-sm-12" style="margin-top: 30px">
                            <form action="{{url("/admin/appointments")}}" method="get">
                                <div class="row">
                                    {{--                                    <div class="col-sm-3">--}}
                                    {{--                                        <input type="text" class="form-control" id="basicInput" placeholder="Search">--}}
                                    {{--                                    </div>--}}
                                    <div class="col-sm-4">
                                        <select class="form-select" id="basicSelect">--}}
                                            <option selected="">Choose purpose</option>
                                            @foreach($appointments as $appointment)
                                                <option @if(app("request")->input("appointment_id")==$appointment->appointment_id) selected @endif value="{{$appointment->appointment_id}}">{{$appointment->appointment_purpose}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="form-select" id="basicSelect">--}}
                                            <option selected="">Choose project</option>
                                            @foreach($appointments as $appointment)
                                                <option @if(app("request")->input("appointment_id")==$appointment->appointment_id) selected @endif value="{{$appointment->appointment_id}}">{{$appointment->appointment_project}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="form-select" id="basicSelect">--}}
                                            <option selected="">Choose status</option>
                                            @foreach($appointments as $appointment)
                                                <option @if(app("request")->input("appointment_id")==$appointment->appointment_id) selected @endif value="{{$appointment->appointment_id}}">{{$appointment->appointment_status}}</option>
                                            @endforeach
                                        </select>
                                    </div>
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
                            <a href="{{url("admin/create-appointment")}}" class="btn btn-primary">Add new appointment</a>
                        </div>
                        <h4 class="card-title">Appointment schedule</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-lg">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Staff</th>
                                        <th>Purpose</th>
                                        <th>Project</th>
                                        <th>Status</th>
                                        <th>CustomerID</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($appointments as $item)
                                        <tr>
                                            <td>{{$loop->index + 1}}</td>
                                            <td>{{$item->appointment_staff}}</td>
                                            <td>{{$item->appointment_purpose}}</td>
                                            <td>{{$item->appointment_project}}</td>
                                            <td>{{$item->appointment_status}}</td>
                                            <td>{{$item->customer_id}}</td>
                                            <td>
                                                <button class="btn btn-primary"><a style="color: white" href="{{url("/admin/appointment-details/".$item->appointment_id)}}">View</a> </button>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                                {{--                            {!! $appointments->appends(request()->input())->links("vendor.pagination.default") !!}--}}
                            </div>
                        </div>
                    </div>
                </div>

@endsection
