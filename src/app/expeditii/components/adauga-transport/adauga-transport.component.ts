import { TransportService } from './../../../shared/services/transport.service';
import { InteractionService } from './../../../shared/services/interaction.service';
import { ProgressBarService } from './../../../shared/services/progress-bar.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-adauga-transport',
  templateUrl: './adauga-transport.component.html',
  styleUrls: ['./adauga-transport.component.css'],
})
export class AdaugaTransportComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router,
    private interactionService: InteractionService,
    private transportService: TransportService
  ) {}

  incarcare: [string, string];
  esteCompletataIncarcare: boolean = true;
  descarcare: [string, string];
  km: number;

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      const startInput = document.getElementById(
        'incarcare'
      ) as HTMLInputElement;
      const endInput = document.getElementById(
        'descarcare'
      ) as HTMLInputElement;

      const startSearchBox = new google.maps.places.SearchBox(startInput);
      const stopSearchBox = new google.maps.places.SearchBox(endInput);
      let sOras;
      let sTara;
      let startValue;
      let endValue;

      startSearchBox.addListener('places_changed', () => {
        const places = startSearchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry');
            return;
          }
          // console.log(place.geometry.location.lat());
          startValue = place.formatted_address;

          this.esteCompletataIncarcare = !this.esteCompletataIncarcare;
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (addressType == 'locality') {
              sOras = place.address_components[i].long_name;
            }
            if (addressType == 'country') {
              sTara = place.address_components[i].long_name;
            }
          }
          this.incarcare = [sOras, sTara];
        });
      });

      stopSearchBox.addListener('places_changed', () => {
        const places = stopSearchBox.getPlaces();
        let oras;
        let tara;
        if (places.length == 0) {
          return;
        }

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry');
            return;
          }
          // console.log(place);
          endValue = place.formatted_address;
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (addressType == 'locality') {
              oras = place.address_components[i].long_name;
            }

            if (addressType == 'country') {
              tara = place.address_components[i].long_name;
            }
          }

          this.descarcare = [oras, tara];

          if (this.incarcare) {
            const ruta = {
              origin: startValue,
              destination: endValue,
            };

            this.interactionService.sendMessage(ruta);
          }
        });
      });
    });

    this.interactionService.message$.subscribe((kmTimp) => {
      var self = this;
      if (kmTimp.km) {
        self.km = parseFloat(kmTimp.km.toFixed(2));
      }
    });
  }

  onSubmit(transportForm: NgForm) {
    this.progressBar.startLoading();
    const registerObserver = {
      next: (x) => {
        this.progressBar.setSuccess();
        this.alertService.success('Înregistrare reușită!');
        this.progressBar.completeLoading();
        this.router.navigateByUrl('/companie');
      },
      error: (err) => {
        this.progressBar.setError();
        this.alertService.danger('Înregistrare eșuată!');
        this.progressBar.completeLoading();
        transportForm.reset();
      },
    };
    this.transportService
      .registerTransport(transportForm.value)
      .subscribe(registerObserver);
  }
}
