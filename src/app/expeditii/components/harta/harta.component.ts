import { TransportService } from './../../../shared/services/transport.service';
import { InteractionService } from './../../../shared/services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

// declare var google;

@Component({
  selector: 'app-harta',
  templateUrl: './harta.component.html',
  styleUrls: ['./harta.component.css'],
})
export class HartaComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private interactionService: InteractionService,
    private t: TransportService
  ) {}
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  ngOnInit(): void {
    const myLatLng = { lat: 45.759689, lng: 24.230371 };
    this.mapsAPILoader.load().then(() => {
      var self = this;
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: myLatLng,
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
      );

      // let markers: google.maps.Marker[] = [];

      // this.loopFunction(50000, function () {
      //   const registerObserver = {
      //     next: (x) => {
      //       console.log(x.message.items[0]);

      //       const neighborhoods: google.maps.LatLngLiteral[] = [
      //         {
      //           lat: x.message.items[0].latitude,
      //           lng: x.message.items[0].longitude,
      //         },
      //       ];

      //       const marker = new google.maps.Marker({
      //         position: neighborhoods[0],
      //         map: map,
      //       });
      //       markers.push(marker);
      //     },
      //     error: (err) => {
      //       console.log(err);
      //     },
      //   };
      //   const t = {
      //     id: [8436978],
      //   };
      //   self.t.test(t).subscribe(registerObserver);
      // });

      this.interactionService.message$.subscribe((ruta) => {
        var self = this;
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('panel'));

        if (ruta.origin) {
          var request = {
            origin: ruta.origin,
            destination: ruta.destination,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              const raspuns = {
                km: response.routes[0].legs[0].distance.value * 0.001,
                timp: response.routes[0].legs[0].duration.text,
              };
              self.interactionService.sendMessage(raspuns);

              directionsDisplay.setDirections(response);
            }
          });
        }
      });
    });
  }

  // loopFunction(delay, callback) {
  //   var loop = function () {
  //     callback();
  //     setTimeout(loop, delay);
  //   };
  //   loop();
  // }
}
