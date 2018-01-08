/**
 * Created by Dirk Soentjens on 23/06/17.
 */
//http://blog.ambushboardco.com/wp-content/uploads/2013/06/Chicks.jpg
imageApp.controller('imageController', function($scope, $http){
	console.log("init imageController ..");
	$scope.image_src = "https://i1.wp.com/www.sirnigelcogs.com/wp-content/uploads/cathamburgerspace.jpg";
	//$scope.analyse_body = { "requests":[ { "tasks":[ { "type":"TAGS" }, { "type":"CAPTIONS" }, { "type":"AESTHETIC_SCORE" } ], "image":{ "url": $scope.image_src} } ] };
	$scope.image_results = {};
	$scope.aesthetic_score = "press analyse"; 
	$scope.previous_links = [];
	$scope.b_add_link = true;
	$scope.models = [
		{model : "a175f39a-b40d-11e7-a58b-069c6a5f4f08", name : "18-10-17"},
	    {model : "60ea0a8c-a8e6-11e7-a58b-069c6a5f4f08", name : "04-10-17"},
	    {model : "7a996048-9eac-11e7-911b-069c6a5f4f08", name : "21-09-17"},
	    {model : "ea672d68-9215-11e7-afca-069c6a5f4f08", name : "28-08-17"},
		{model : "9b6848d8-d5d5-11e7-a354-069c6a5f4f08", name : "30-11-17"},
		{model : "1afa6494-e591-11e7-ae28-a0999b009b3b", name : "02-01-18"},
	];
	
	$scope.selected_model = $scope.models[0].model;
	
	$scope.analyse_image = function(){
		$scope.aesthetic_score = "Loading...";
	    $http({
			url : "serverside/post_to_EyeEm.php",
	        method:"post",
            data: {
                "image_src" : $scope.image_src,
				"model_id" : $scope.selected_model,
            },
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		}).then(function (response) {
	        //console.log("succes response : " , response)
			$scope.image_results = response.data;
			//console.log("succes $scope.image_results.responses : " , $scope.image_results.responses.lenght)
			if($scope.image_results.responses == undefined){
				$scope.aesthetic_score = "Error";
			}else{
				$scope.aesthetic_score = $scope.image_results.responses[0].personalized_scores.scores[$scope.selected_model];
			}
			
			
	    });
		//add link to file
		if($scope.b_add_link)
			$scope.add_link();
		
		$scope.b_add_link = true
	}
	
	$scope.add_link = function(){
		//console.log("add link to txt file");
	    $http({
			url : "serverside/post_link.php",
	        method:"post",
            data: {
                "image_src" : $scope.image_src,
            },
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		}).then(function (response) {
	        //console.log("succes response : " , response)
			//console.log("link added");
			//reload the links
			$scope.load_archived_links();
	    });
	}
	
	$scope.load_archived_links = function(){
		//console.log("load_archived_links")
	    $http({
			url : "serverside/load_links.php",
	        method:"get",
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		}).then(function (response) {
	        //console.log("link loaded : " , response)
			// $scope.previous_links = 
		    var lines = response.data.split('\n');
			$scope.previous_links = [];
		    for(var line = 0; line < lines.length; line++){
				if(lines[line] != ""){
					$scope.previous_links.push(lines[line]);
				}
		    }	
	    });
	}
	$scope.set_image = function(url){
		$scope.image_src = url;
		$scope.aesthetic_score = "press analyse"; 
		$scope.b_add_link = false;
	}
	
	$scope.$watch('image_src', function() {
	     $scope.aesthetic_score = "press analyse"; 
	});
	
	$scope.load_archived_links();
});
