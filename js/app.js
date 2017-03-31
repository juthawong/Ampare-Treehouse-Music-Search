jQuery(document).ready(function(){
	//Waiting For All Element Ready
	jQuery('.search-form').submit(function(event){
		//When Search Form are submit
		event.preventDefault(); //Don't let it submit
		jQuery.getJSON('https://api.spotify.com/v1/search?q='+  jQuery('#search').val() +'&type=album',function(music){ //Get JSON From Spotify API
			let html = ""; // Create Variable To Store HTML First , Prevent Google Chrome Auto Correct and DOM Breaking
			if(music.albums.items.length > 0){ //If it has more than 0 result
				jQuery.each(music.albums.items, function(key,value){
					valueglobal = value;
					html += `<li>
					<div class="album-wrap">
					<img class="album-art" src="`;
					jQuery.each(value.images,function(key,value)  {
					if(value.height == 640){ html += value.url ; } //Loop Through and Select Image That Height 640px 
				});
					html+= `"></div>
					<span class="album-title">` + value.name +   `</span> 
					<span class="album-artist">`+ value.artists[0].name +`</span>
					</li>`
				 //Set Name and Artisit Name
				});
			jQuery('#albums').html(html); //Set HTML of Albums as the temporary store html

		}else{
  			//If No Result Found Say That No Result Found
 		 jQuery('#albums').html(`<li class='desc no-albums'> 	<i class='material-icons icon-help'>help_outline</i>No albums found that match: ` + jQuery('#search').val() + `. </li>`); //Saying That No Result Found For This Search
		}
		});
	});
});