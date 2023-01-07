const fetch = require('node-fetch');

/**
 * 
 * @param {Number} UserID ID of the user
 */
async function getUserDetails(userid) {
    return new Promise((resolve, reject) => {
        fetch(`https://users.roblox.com/v1/users/${userid}/`).then(async (basicData) => {
            fetch(`https://friends.roblox.com/v1/users/${userid}/followers`).then(async (followersResponse) => {
                fetch(`https://friends.roblox.com/v1/users/${userid}/friends`).then(async (friendsResponse) => {
                    fetch(`https://friends.roblox.com/v1/users/${userid}/followings`).then(async (followingResponse) => {
                        fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`).then(async (avatarResponse) => {
                            fetch(`https://games.roblox.com/v2/users/${userid}/games?sortOrder=Asc&limit=10`).then(async (gameResponse) => {

                                followersResponse = await followersResponse.json();
                                friendsResponse = await friendsResponse.json();
                                followingResponse = await followingResponse.json();
                                avatarResponse = await avatarResponse.json();
                                gameResponse = await gameResponse.json();
                                basicData = await basicData.json();

                                let followersArr = [];
                                followersResponse.data.forEach(user => {
                                    followersArr.push(user.id);
                                });
                                let friendsArr = [];
                                friendsResponse.data.forEach(user => {
                                    friendsArr.push(user.id);
                                });
                                let followingArr = [];
                                followingResponse.data.forEach(user => {
                                    followingArr.push(user.id);
                                });
                                let gamesArr = [];
                                /*
                                gameResponse.data.forEach(game => {
                                    gamesArr.push([game.id, game.name, game.description, game.placeVisits])
                                });
                                */
                                for (const game of gameResponse.data) {
                                    gamesArr.push({ "id": game.id, "name": game.name, "description": game.description, "visits": game.placeVisits});
                                };

                                resolve({
                                    "id": basicData.id,
                                    "username": basicData.name,
                                    "description": basicData.description,
                                    "created": basicData.created,
                                    "avatar_url": avatarResponse.data[0].imageUrl,
                                    "friends": {
                                        "count": friendsArr.length,
                                        "ids": friendsArr
                                    },
                                    "followers": {
                                        "count": followersArr.length,
                                        "ids": followersArr
                                    },
                                    "following": {
                                        "count": followingArr.length,
                                        "ids": followingArr
                                    },
                                    "games": gamesArr
                                });
                            })
                        });
                    });
                });
            });
        });
    });
}

module.exports = async function (identifier, type) {
    return new Promise((resolve, reject) => {

        if (!type) type = "id";

        if (type == "id") {
            fetch(`https://users.roblox.com/v1/users/${identifier}/`).then(async (response) => {
                if (response.status == 404) return reject("Not found.")
                response = await response.json();

                getUserDetails(response.id).then(finished => {
                    resolve(finished);
                });
            });
        } else if (type == "username") {
            fetch(`https://api.roblox.com/users/get-by-username?username=${identifier}`).then(async (response) => {
                response = await response.json();
                if (response.success !== 'undefined') {
                    if (response.success == false) return reject("Not found.");
                }
                getUserDetails(response.Id).then(finished => {
                    resolve(finished);
                });
            });
        }
    });
}
