@extends("admin_layout")
@section("admin_main")
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <h3 class="m-0">Edit appointment schedule</h3>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <section class="content">
        <div class="container-fluid">
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-6">
                    <form action="{{url("/update-appointment-schedule/".$customer_department->customer_mana_id)}}" method="post">
                        @csrf
                        <div class="form-group">
                            <label>Staff</label>
                            <input type="text" name="customer_mana_staff" class="form-control" value="{{$customer_department->customer_mana_staff}}"/>
                            @error("customer_mana_staff")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Purpose</label>
                            <input type="text" name="customer_mana_purpose" class="form-control" value="{{$customer_department->customer_mana_purpose}}"/>
                            @error("customer_mana_purpose")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Project</label>
                            <input type="text" name="customer_mana_project" class="form-control" value="{{$customer_department->customer_mana_project}}"/>
                            @error("customer_mana_project")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Status</label>
                            <input type="text" name="customer_mana_status" class="form-control" value="{{$customer_department->customer_mana_status}}"/>
                            @error("customer_mana_status")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Evaluate</label>
                            <input type="text" name="customer_mana_evaluate" class="form-control" value="{{$customer_department->customer_mana_evaluate}}"/>
                        </div>
                        <p></p>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
