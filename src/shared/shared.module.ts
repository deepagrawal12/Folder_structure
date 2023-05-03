import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/simactivation/assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {
  currentUrl: string;
  urlParts: string[];
  currentSite: string;
  lang: string;

   /**
   * Implements Constructor
   * @param translate
   */
  constructor(private translate: TranslateService) {

    this.currentUrl = location.pathname;
    this.urlParts = this.currentUrl.split('/', 3);
    this.lang = this.urlParts[1];
    this.translate.use(this.lang);
  }
}
