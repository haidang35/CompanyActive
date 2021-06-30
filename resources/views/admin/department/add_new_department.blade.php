@extends("admin_layout")
@section("admin_main")
    <section class="section">
        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Add new department</h4>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <form action="{{url("admin/manage-departments/save")}}" method="post">
                                @csrf
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="basicInput">Department Name</label>
                                        <input type="text" class="form-control" id="basicInput"
                                               name="department_name"
                                        >
                                        @error("department_name")
                                        <div class="text-danger">{{$message}}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="helpInputTop">Department Code</label>
                                        <input type="text" class="form-control" id="helpInputTop" name="department_code">
                                        @error("department_code")
                                        <div class="text-danger">{{$message}}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="helperText">Pic</label>
                                        <small class="text-muted">Manager of department</small>
                                        <select class="form-control form-select" name="department_pic">
                                            <option>Select Pic</option>
                                            @foreach($pics as $item)
                                                <option value="{{$item->staff_name}}">{{$item->staff_name}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="helperText">Description</label>
                                        <textarea cols="6" id="helperText" class="form-control" name="department_desc"></textarea>
                                        <p><small class="text-muted">Description about department</small>
                                        </p>
                                    </div>
                                    <div class="buttons float-md-end">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
@endsection
