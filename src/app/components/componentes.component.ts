import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// declare function init_plugins();

@Component({
  selector: 'components-pages',
  templateUrl: './components.component.html',
  // styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
    // init_plugins();
    console.log("object");
    if("aut" in localStorage){
      // console.log("sasshbf");
      // this.router.navigateByUrl('/dashboard')
      // 
    } else {
      // console.log("object");
      this.router.navigateByUrl('/login')
    }
    
  }

}
