@extends("admin_layout")
@section("admin_main")
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <h4 class="m-0">Add new customer</h4>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <section class="content">
        <div class="container-fluid">
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-6">
                    <form action="{{url("/admin/customers/save-customer")}}" method="post">
                        @csrf
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="customer_name" class="form-control" value="{{old("customer_name")}}"/>
                            @error("customer_name")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Phone</label>
                            <input type="text" name="customer_phone" class="form-control" value="{{old("customer_phone")}}"/>
                            @error("customer_phone")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                            <label>Address</label>
                            <input type="text" name="customer_address" class="form-control" value="{{old("customer_address")}}"/>
                        </div>
                        <div>
                            <label>Relationship</label>
                            <input type="text" name="customer_relationship" class="form-control" value="{{old("customer_relationship")}}"/>
                            @error("customer_relationship")
                            <p class="text-danger">{{$message}}</p>
                            @enderror
                        </div>
                        <div>
                                <label>Staff</label>
                                <select name="staff_id" class="form-control">
                                    <option value="0">Select staff</option>
                                    @foreach($staffs as $item)
                                        <option @if(old("staff_id") == $item->staff_id) selected @endif value="{{$item->staff_id}}">{{$item->staff_id}}</option>
                                    @endforeach
                                </select>
                                @error("staff_id")
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
