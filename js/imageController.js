/**
 * Created by Dirk Soentjens on 23/06/17.
 */
//http://blog.ambushboardco.com/wp-content/uploads/2013/06/Chicks.jpg
imageApp.controller('imageController', function($scope, $http){
	console.log("init imageController ..");
	$scope.image_src = "https://i1.wp.com/www.sirnigelcogs.com/wp-content/uploads/cathamburgerspace.jpg";
	//$scope.analyse_body = { "requests":[ { "tasks":[ { "type":"TAGS" }, { "type":"CAPTIONS" }, { "type":"AESTHETIC_SCORE" } ], "image":{ "url": $scope.image_src} } ] };
	$scope.image_results = {};
	$scope.analyse_image = function(){
		$scope.image_results = "Loading...";
	    $http({
			url : "serverside/post_to_EyeEm.php",
	        method:"post",
            data: {
                "image_src" : $scope.image_src,
            },
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		}).then(function (response) {
	        console.log("succes response : " , response)
			$scope.image_results = response.data;
	    });
	}
	
});
