@extends("admin_layout")
@section("admin_main")
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Mange departments</h4>
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
                                    <div class="buttons">
                                        <button class="btn btn-primary rounded-pill">View</button>
                                        <button class="btn btn-warning rounded-pill">Edit</button>
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
