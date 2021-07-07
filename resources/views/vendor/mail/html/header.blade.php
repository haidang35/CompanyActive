<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'CompanyActive')
<img src="{{asset("https://i.postimg.cc/qBVcJ2yq/iconweb.png")}}"  class="logo" alt="Company Active Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
