    // define ui declaire 
    let form = document.getElementById('form')
    let input = document.getElementById('input');
    let repoList = document.querySelector('.repo-list');
    let repoCount = document.querySelector('#repocount');
    let msg = document.getElementById('msg')

    // gitub get data 
    let img = document.getElementById('img');
    let userName = document.getElementById('name');
    let userLocation = document.getElementById('location');
    let userBio = document.getElementById('bio');
    let userFollower = document.getElementById('follower');
    let UserFollowing = document.getElementById('following');

    form.addEventListener('submit', searchUser); // search user 


    function searchUser(event) {
        event.preventDefault();
        let inputValue = input.value;

        let url  = `https://api.github.com/users/${inputValue}`


        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => getData(data))
            .catch(e => {
                msg.style.display = 'block';
                msg.textContent = "Please Enter valid User Name";
                setTimeout(() => {
                    msg.textContent = '';
                    msg.style.display = 'none';
                }, 5000);
            });

            input.value = '';
            repoList.innerHTML = '';
            repoCount.innerHTML = ' Github Reposotory ';
    }

    function getData(data) {
        const {
            avatar_url,
            bio,
            location,
            name,
            repos_url,
            followers,
            following
        } = data;
        img.src = avatar_url;
        userName.innerText = name;
        userLocation.innerText = location;
        userBio.innerText = bio;
        userFollower.innerText = `Followers  ${followers}`;
        UserFollowing.innerText = `Following  ${following}`;

        let repo_link = repos_url;
        if (repo_link) {
            fetch(repos_url)
            .then(respons => respons.json())
            .then(repoData => getRepo(repoData))

        }
    }


    function getRepo(repoData) {
        let count = 1;
        repoCount.innerHTML = `Github Reposotory ( ${repoData.length} )`;
        for (const iterator of repoData) {
            const {
                name,
                html_url
            } = iterator;
            let li = document.createElement('li')
            let markup = `<a href="${html_url}"> <span>${count++} </span>   ${name}</a>`
            repoList.appendChild(li)
            li.innerHTML = markup;
        }

    }
