@extends("admin_layout")
@section("admin_main")
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-6">
                    <h4 class="card-title">Appointment schedule</h4>
                </div>
                <div class="col-sm-6">
                    <a style="float: right" href="{{url("/create-appointment-schedule")}}" class="btn btn-primary">New appointment schedule</a>
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
                            <th>Staff</th>
                            <th>Purpose</th>
                            <th>Project</th>
                            <th>Status</th>
                            <th>Evaluate</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($customer_manage as $item)
                            <tr>
                                <td>{{$loop->index + 1}}</td>
                                <td>{{$item->customer_mana_staff}}</td>
                                <td>{{$item->customer_mana_purpose}}</td>
                                <td>{{$item->customer_mana_project}}
                                <td>{{$item->customer_mana_status}}</td>
                                <td>{{$item->customer_mana_evaluate}}</td>
                                <td>
                                    <div class="buttons" style="display: inline-flex">
                                        <button class="btn btn-warning"><a href="{{url("/edit-appointment-schedule/".$item->customer_mana_id)}}">Edit</a></button>
                                        <button class="btn btn-warning">
                                            <a onclick="return confirm('Chac chan huy cuoc hen {{$item->customer_mana_purpose}}?')" href="{{url("/cancel-appointment-schedule/".$item->customer_mana_id)}}">Cancel</a></button>
                                    </div>
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
