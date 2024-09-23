const xValues = ["01/08/2024","02/08/2024","03/08/2024","04/08/2024","05/08/2024","06/08/2024","07/08/2024","08/08/2024","09/08/2024","10/08/2024"];

new Chart("chart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [0,11,10,1,13,11,13,22,15,18],
      borderColor: "#333",
      fill: false
    }, { 
      data: [16,17,17,19,20,27,5,12,6,17],
      borderColor: "purple",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});