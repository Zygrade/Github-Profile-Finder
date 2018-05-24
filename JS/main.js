$(document).ready(function(){
    $('#searchUser').on('keyup',function(e){
        let username = e.target.value;

        $.ajax({
            url : 'https://api.github.com/users/'+username,
            type : 'GET',
            data : {
              client_id : '34d5d7f061bd258171dd',
              client_secret : 'f0fa65d554c97896105665ed22b3116d9b3576e9'
            }
        }).done(function(user_data){
          $.ajax({
              url:'https://api.github.com/users/'+username+'/repos',
              data:{
                client_id:'97b26d4e8ed886bd89fa',
                client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f',
                sort: 'created: asc',
              }
              }).done(function(repos){
                $.each(repos, function(index, repo){
                  $('#repos').append(`
                    <div class="container">
                      <div class="row">
                        <div class="col-md-7">
                          <h5>${repo.name}</h5>
                          <p class="lead">${repo.description}</p>
                        </div>
                        <div class="col-md-3">
                          <span class="label label-default"><strong>Forks:</strong> ${repo.forks_count}</span>
                          <span class="label label-primary"><strong>Watchers:</strong> ${repo.watchers_count}</span>
                          <span class="label label-success"><strong>Stars:</strong> ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                          <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                        </div>
                      </div>
                    </div>
                    <br>
                  `);
                });
              });
            //console.log(user_data);
            $('#profile').html(`
              <div class="card mb-3 container">

                  <div class="row">
                    <div class="col-md-3">
                      <img class="card-img-top" src="${user_data.avatar_url}">
                      <div class="card-body">
                      <a href="${user_data.html_url}" target="_blank" class="btn btn-danger">Github Profile</a>
                    </div>
                  </div>

                  <div class="col-md-9">
                    <span class="label label-default"><strong>Public Repos:</strong> ${user_data.public_repos}</span>
                    <span class="label label-primary"><strong>Public Gists: </strong>${user_data.public_gists}</span>
                    <span class="label label-success"><strong>Followers:</strong> ${user_data.followers}</span>
                    <span class="label label-info"><strong>Following: </strong>${user_data.following}</span>
                    <br><br>
                    <ul class="list-group">
                      <li class="list-group-item"><strong>Company:</strong> ${user_data.company}</li>
                      <li class="list-group-item"><strong>Website/blog:</strong> <a href="${user_data.blog}" target="_blank">${user_data.blog}</a></li>
                      <li class="list-group-item"><strong>Location:</strong> ${user_data.location}</li>
                      <li class="list-group-item"><strong>Member Since:</strong> ${user_data.created_at}</li>
                    </ul>
                    </div>

                  </div>
                </div>
                <br>
                <h2 class="display-4 container">Repositories</h2>
                <br>
                <div id="repos"></div>
              `);
        })
    });
});
