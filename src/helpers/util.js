function friendlyDate(dateStr) {
	let dateObj = typeof dateStr === 'object' ? dateStr:new Date(dateStr),
	time = dateObj.getTime(),
	now = Date.now(),
	space = now - time,
	str = ''

	switch (true) {
		case space < 60*1000:
			str = '刚刚'
			break;
		case space < 60*1000*60:
			str = Math.floor(space/(60*1000)) + '分钟前'
			break;
		case space < 60*1000*60*24:
			str = Math.floor(space/(60*1000*60)) + '小时前'
			break;
		case space < 60*1000*60*24*365:
			str = Math.floor(space/(60*1000*60*24)) + '天前'
			break;
		default:
			str = Math.floor(space/(60*1000*60*24*365)) + '年前'
			break;
	}
	return str;
}

export default {
	install(Vue,options) {
		console.log(options)
		Vue.prototype.friendlyDate = friendlyDate
	}
}