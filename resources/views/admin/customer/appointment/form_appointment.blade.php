@extends("admin_layout")
@section("admin_main")
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <h4 class="m-0">Add new appointment</h4>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <section class="content">
        <div class="container-fluid">
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-6">
                    <form action="{{url("/admin/appointments/save-appointment")}}" method="post">
                        @csrf
                        <div class="form-group">
                            <label>Staff</label>
                            <input type="text" name="appointment_staff" class="form-control" value="{{old("appointment_staff")}}"/>
                            @error("appointment_staff")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Purpose</label>
                            <input type="text" name="appointment_purpose" class="form-control" value="{{old("appointment_purpose")}}"/>
                            @error("appointment_purpose")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Project</label>
                            <input type="text" name="appointment_project" class="form-control" value="{{old("appointment_project")}}"/>
                            @error("appointment_project")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Status</label>
                            <select name="appointment_status" class="form-control">
                                <option value="0">Select status</option>
                                <option value="1">priority</option>
                                <option value="1">implement</option>
                                <option value="1">completed</option>

                            </select>
{{--                            @error("appointment_status")--}}
{{--                            <p class="text-danger">{{$message}}</p>--}}
{{--                            @enderror--}}
                        </div>
                        <div>
                            <label>Customer</label>
                            <select name="customer_id" class="form-control">
                                <option value="0">Select customer</option>
                                @foreach($customers as $item)
                                    <option @if(old("customer_id") == $item->customer_id) selected @endif value="{{$item->customer_id}}">{{$item->customer_name}}</option>
                                @endforeach
                            </select>
                            @error("customer_id")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <p></p>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
