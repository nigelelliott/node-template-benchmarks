<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Node Template Performance Comparison</title>

    <link href="/static/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/css/custom.css" rel="stylesheet">

</head>

<body>

    <div class="container page">

        <p>Using Node version: <strong><%= version %></strong></p>
        <p>Rendering  <strong><%= iterations %></strong> iterations of a single component / template:</p>

        <table class="table table-striped table-bordered">
            <tr>
                <th>Template Engine</th>
                <th>Render Time (ms)</th>
                <!--
                <th>Change</th>
                <th>Overall Change</th>
                -->
                <th class="warning">Avg. Render Time (ms) <span class="caret" aria-hidden="true"></span> </th>
                <th>Change</th>
                <th>Overall Change</th>
            </tr>
            <%
            _.each(flat, function(row){
            %>
            <tr>
                <td><%= row.name %></td>
                <td><%= row.result.time %></td>
                <!--
                <td><span class="label label-<%= row.change.last.className %>"><%= row.change.last.time %></span></td>
                <td><span class="label label-<%= row.change.last.className %>"><%= row.change.overall.time %></span></td>
                -->
                <td class="warning"><%= row.result.avg %></td>
                <td><span class="label label-success"><%= row.change.last.avg %></span></td>
                <td><span class="label label-info"><%= row.change.overall.avg %></span></td>
            </tr>
            <%
            });
            %>
        </table>

        <p>Rendering  <strong>1</strong> iteration of a deep nested component / template <strong>{grandparent}</strong> (1) --> <strong>{parent}</strong> (10) --> <strong>{child}</strong> (100):</p>

        <table class="table table-striped table-bordered">
            <tr>
                <th>Template Engine</th>
                <th>Render Time (ms)</th>
                <!--
                <th>Change</th>
                <th>Overall Change</th>
                -->
                <th class="warning">Avg. Render Time (ms) <span class="caret" aria-hidden="true"></span> </th>
                <th>Change</th>
                <th>Overall Change</th>
            </tr>
            <%
            _.each(deep, function(row){
            %>
            <tr>
                <td><%= row.name %></td>
                <td><%= row.result.time %></td>
                <!--
                <td><span class="label label-<%= row.change.last.className %>"><%= row.change.last.time %></span></td>
                <td><span class="label label-<%= row.change.last.className %>"><%= row.change.overall.time %></span></td>
                -->
                <td class="warning"><%= row.result.avg %></td>
                <td><span class="label label-success"><%= row.change.last.avg %></span></td>
                <td><span class="label label-info"><%= row.change.overall.avg %></span></td>
            </tr>
            <%
            });
            %>
        </table>

    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="/static/js/bootstrap.min.js"></script>

</body>

</html>
