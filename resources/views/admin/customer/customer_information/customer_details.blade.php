@extends("admin_layout")
@section("admin_main")
<div class="card-content">
    <?php $message = Session::get("message_success") ?>
    <?php $message = Session::get("message_delete") ?>
    <?php $message = Session::get("message_edit")?>
    @if($message)
        <div class="alert alert-success col-sm-6">{{$message}}</div>
    @endif
    <?php Session::put("message_success", "") ?>
    <?php Session::put("message_delete", "") ?>
    <?php Session::put("message_edit","")?>
</div>
<div class="card">
    <div class="card-header">
        <div class="buttons float-sm-end">
            @if($edit == true)
                <button form="edit-customer" type="submit" class="btn btn-primary">Save</button>
                <a href="{{url("/admin/customer-details/".$customer->customer_id)}}" class="btn btn-warning">Cancel</a>
            @else
                <a href="{{url("/admin/customer-details/edit-customer/".$customer->customer_id)}}" class="btn btn-primary">Edit</a>
            @endif

        </div>
        <h4 class="card-title">Customer details </h4>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="card-body">
                <div class="row">
                    <form id="edit-customer" action="{{url("/admin/customers-details/update-customer/".$customer->customer_id)}}" method="post">
                        @csrf
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Customer name</label>
                                    <input type="text" name="customer_name" class="form-control" @if(!$edit) disabled @endif value="{{$customer->customer_name}}"/>
                                    @error("customer_name")
                                    <p class="text-danger">{{$message}}</p>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" name="customer_phone" class="form-control" @if(!$edit) disabled @endif value="{{$customer->customer_phone}}"/>
                                    @error("customer_phone")
                                    <p class="text-danger">{{$message}}</p>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" name="customer_address" class="form-control" @if(!$edit) disabled @endif value="{{$customer->customer_address}}"/>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Relationship</label>
                                    <input type="text" name="customer_relationship" class="form-control" @if(!$edit) disabled @endif value="{{$customer->customer_relationship}}"/>
                                    @error("customer_relationship")
                                    <p class="text-danger">{{$message}}</p>
                                    @enderror
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
<div class="card">
    <div class="card-header">
        <div class="buttons float-md-end">
            <a href="{{url("/admin/appointments/form-appointment/".$customer->customer_id)}}" class="btn btn-primary">Add new appointment</a>
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
                        <th></th>
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
                            <td>
                                <button class="btn btn-primary"><a style="color: white" href="{{url("/admin/appointment-details/".$item->appointment_id)}}">View</a> </button>
                            </td>
                            <td>
                                <button class="btn btn-danger"><a style="color: white" onclick="return confirm('Are you sure delete {{$item->appointment_purpose}}?')" href="{{url("/admin/appointments/delete-appointment/".$item->appointment_id)}}}">Delete</a></button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
{{--        {{ $appointments->appends(request()->input())->links("vendor.pagination.default")  }}--}}
{{--                                      {{ $appointments->links("vendor.pagination.default")  }}--}}
        </div>
    </div>
</div>
@endsection
