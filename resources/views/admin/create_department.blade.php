@extends("admin_layout")
@section("admin_main")
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <h3 class="m-0">Departments</h3>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <section class="content">
        <div class="container-fluid">
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-6">
                    <form action="{{url("/save-department")}}" method="post">
                        @csrf
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="department_name" class="form-control" value="{{old("department_name")}}"/>
                            @error("department_name")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Code</label>
                            <input type="text" name="department_code" class="form-control" value="{{old("department_code")}}"/>
                            @error("department_code")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Pic</label>
                            <input type="text" name="department_pic" class="form-control" value="{{old("department_pic")}}"/>
                            @error("department_pic")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" name="department_desc" class="form-control"/>
                        </div>
                        <div>
                            <label>Number of members</label>
                            <input type="number" name="department_members" class="form-control" value="{{old("department_members")}}"/>
                            @error("department_members")
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
