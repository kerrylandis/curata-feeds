// Processor for Curata formatted calls via AJAX, 
// i.e. http://readpublishing.curatasite.com/api/v1/articles?in_category=42&has_topic=home&sort=pub_date
// Call via a function like this:
// $(document).ready(function() {
//    getCurataContent('in_category=42&has_topic=home&sort=pub_date');
//    });

getCurataContent = function (topic) { //set topic to your Curata variables, like 'in_category=42&has_topic=home&sort=pub_date'
 var curataAPI = 'http://readpublishing.curatasite.com/api/v1/articles?'+topic; //set to your Curata API call
 // You can process custom fields like this: article.custom_fields.VALUENAME;
 
 $.ajax(curataAPI, {
   dataType: "jsonp", success: function(data, textStatus, jqXHR)
   {
       var articles = data.articles, article = null;
       var length = articles.length;
       if (length > 20) {
         length = 20; //configure for max articles you wish to show
       }
       var rows = Math.round(length/4); //set for max articles per column, in this case 4
       if (rows < 1) { rows = 1; }
       var i=0;
       
         //replace #featuredContent with the parent div ID where you will be inserting the Curata articles
         $("#featuredContent").append('<div id="setHeight"></div>');
         for (i; i < length; i++)
         {
           jQuery("#setHeight").append('<div class="col-12-3" id="featuredContent'+i+'"></div>'); //set to your column grid class. I used 4 columns in my case and you can run a function on setHeight to set the article results to the same height.
           var article = articles[i];
           var background = null;
           var image = null;
           if (article.image != null){
             image = article.image
           } else {
             image = displayImageWide(); // uses the image randomizer function in my other repo as backup
           }
           
            // simple check to set alternating background color classes for a checkered effect using your own classes
           if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9 || i == 11) {
              background = 'background-gray-80';
          } else { background = 'background-black'; }
           
           $("#featuredContent"+i).append('<div><div class="'+background+'"><div class="card_image"><img alt="" src="' + image + '" width="" height="" class="resize"/></div><div class="card_content"><h4>' + article.title + '</h4><div class="overview">'+ article.snippet + '</div></div><div class="card_bottom"><p><a href="' + article.url + '">Details</a></p></div></div></div>');

         }
   }
 });
}
