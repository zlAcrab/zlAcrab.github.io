function classNames(options){
	var str = "";
	for( var attr in options ){
		if( options[attr] ){
			str += " " + attr;
		}
	}

	return str.trim();
}