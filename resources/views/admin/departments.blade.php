@extends("admin_layout")
@section("admin_main")
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-6">
                    <h4 class="card-title">Mange departments</h4>
                </div>
                <div class="col-sm-6">
                    <a style="float: right" href="{{url("/form-create-department")}}" class="btn btn-primary">New department</a>
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
                            <th>Name</th>
                            <th>Code</th>
                            <th>Pic</th>
                            <th>Description</th>
                            <th>Number of members</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($departments as $item)
                            <tr>
                                <td>{{$loop->index + 1}}</td>
                                <td>{{$item->department_name}}</td>
                                <td>{{$item->department_code}}</td>
                                <td>{{$item->department_pic}}</td>
                                <td>{{$item->department_desc}}</td>
                                <td>{{$item->department_members}}</td>
                                <td>
                                    <ul class="buttons" style="list-style: none;display: inline-flex">
                                        <li><button class="btn btn-primary">View</button></li>
                                        <li><button class="btn btn-warning"><a href="{{url("/edit-department",["department_id"=>$item->department_id])}}">Edit</a></button></li>
                                    </ul>
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
