# roblox-api-discord
## Credits to easy-roblox-api for the getGroup and getUser functions.

# Installation
Install with NPM:
```
$ npm install roblox-api-discord
```
## Version
The current version is v2.0.0 - which added the `getGroup()` function. This is the most stable and recommended version.

# Quick Start
## Information about a User
This will get a lot of data about user:
```js
const roblox = require('roblox-api-discord');
roblox.getUser("Roblox Username", "username").then(response => {
	 console.log(response); 
}).catch(() => {
	console.log("An error occured, most likely that user does't exist!");
});
```

This will log something like this:
```python
{
	id: 1,
	username: 'John Doe',
	description: 'The users description here',
	status: 'The users status here',
	created: '2016-07-04T16:59:11.313Z',
	avatar_url: 'User avatar-url',
	friends: {
		count: 8,
		ids: [friends-ids-array]
	},
	followers: {
		count: 14,
		ids: [followers-ids-array]
	},
	following: {
		count: 69,
		ids: [following-ids-array]
	},
	games: [
		{ id: <id-of-game>, name: <name-of-game>, description: <description-of-game>, visits: <game-visits-count> },
		{ id: 3984, name: 'Some-name', description: 'good-game', visits: 3000 }
	]
}
```
As an alternative, you can get user information using an ID:
```js
const roblox = require('roblox-api-discord');
roblox.getUser("Roblox User ID", "id").then(response => {
	 console.log(response); 
});
```
If you leave the 2nd parameter of `getUser` empty, it will assume it is an ID.

## Information about a Group

```js
roblox.getGroup("Group Name", "name").then(res => {
		console.log(res);
}).catch(console.error);
```
This will log something like this:
```python
{
	id: 1,
	name: 'Example name',
	description: 'Example group description',
	owner: { id: 4, username: 'John Doe' },
	membercount: undefined,
	thumbnail: 'some-url-to-a-png',
	shout: {
		content: 'omghi',
		created: '2021-03-11T19:09:57.3352677Z',
		author: { id: 4, username: 'John Doe' }
	},
	roles: [
		{ id: 7, name: 'Some role name', membercount: 0 },
		{ id: 69, name: 'Some other role name', membercount: 6 }
	],
	games: [
		{ id: <id-of-game>, name: <name-of-game>, description: <description-of-game>, visits: <game-visits-count> },
		{ id: 3984, name: 'Some-name', description: 'good-game', visits: 3000 }
	] 
}
```
```
As an alternative, you can get user information using an ID:
```js
const roblox = require('roblox-api-discord');
roblox.getGroup("Roblox Group ID", "id").then(response => {
	 console.log(response); 
});
```
If you leave the 2nd parameter of `getGroup` empty, it will assume it is an ID.

## Support
To get support using the package, report bugs, request updates, or any other sort of request, please use our [GitHub issues page]([https://github.com/Yankue/easy-roblox-api/issues](https://github.com/joshyy-creator/roblox-api-discord/issues)), where I will gladly help you.

## Documentation
Documentation is coming soon. For this guide is all
