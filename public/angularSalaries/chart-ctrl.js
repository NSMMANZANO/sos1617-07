angular
    .module("ManagerApp")
    .controller("SalaryChartCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "sos07";
        $scope.data = {};
        var dataCache = {};
        $scope.datos = [];
        $scope.minimumSalary= [];
        $scope.averageSalary = [];
        $scope.riskOfPoverty = [];
        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("/api/v1/salaries/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.datos.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                $scope.minimumSalary.push(Number($scope.data[i].minimumSalary));
                $scope.averageSalary.push(Number($scope.data[i].averageSalary));
                $scope.riskOfPoverty.push(Number($scope.data[i].riskOfPoverty));
                
                
                console.log($scope.data[i].country);
            }
        });    
            
        console.log("Controller initialized");
        $http.get("/api/v1/salaries/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            
           Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Average Salaries in some years'
    },
    xAxis: {
        categories: $scope.datos
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Salaries'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'MinimumSalary',
        data: $scope.minimumSalary
    }, {
        name: 'AverageSalary',
        data: $scope.averageSalary
    }, {
        name: 'RiskOfPoverty',
        data: $scope.riskOfPoverty
    }]
});
            
        
           
            
            
            //Google
            google.charts.load('current', {
                'packages': ['controls','geochart']
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
            function drawRegionsMap() {
                var myData = [['Country','AverageSalary', 'Year']];
     
                response.data.forEach(function (d){
                    myData.push([capitalizeFirstLetter(d.country), Number(d.averageSalary), Number(d.year)]);
                });
                    
                var data = google.visualization.arrayToDataTable(myData);
                var options = {
                    region: '150',
                    colorAxis: {colors: ['blue', 'green' , 'purple']}
                };
                var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

                var yearSelector = new google.visualization.ControlWrapper({
                    controlType: 'CategoryFilter',
                    containerId: 'filter',
                    options: {
                        filterColumnIndex: 2,
                        ui: {
                            allowTyping: false,
                            allowMultiple: true,
                            allowNone: false
                        }
                    }
                });
                var chart = new google.visualization.ChartWrapper({
                    chartType: 'GeoChart',
                    containerId: 'map',
                    options: {
                        displayMode: 'regions',
                        colorAxis: {colors: ['blue', 'green' , 'purple']}
                    }
                });
                dashboard.bind(yearSelector, chart);
                dashboard.draw(data, options);
            }    



    // Use Morris.Area instead of Morris.Line

  
  
  
});
Morris.Area({
  element: 'myfirstchart',
  behaveLikeLine: true,
  data: [
    {x: '2011 Q1', y: 3, z: 3},
    {x: '2011 Q2', y: 2, z: 1},
    {x: '2011 Q3', y: 2, z: 4},
    {x: '2011 Q4', y: 3, z: 3}
  ],
  xkey: 'x',
  ykeys: ['y', 'z'],
  labels: ['Y', 'Z']
  

 });
    }]);