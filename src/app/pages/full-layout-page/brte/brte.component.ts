import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brte',
  templateUrl: './brte.component.html',
  styleUrls: ['./brte.component.css']
})
export class BrteComponent implements OnInit {
  Blocks: { name: string; value: string; }[];
  School: { name: string; value: string; }[];
  Teacher: { name: string; value: string; }[];
  Designing: { name: string; value: string; }[];
  Knowledge : { name: string; value: string; }[];
  Strategy : { name: string; value: string; }[];
  Interpersonal : { name: string; value: string; }[];
  Professional : { name: string; value: string; }[];
  Schoolatte : { name: string; value: string; }[];
  Teacheratten : { name: string; value: string; }[];
  Promoting : { name: string; value: string; }[];



  constructor() {
    this.Blocks = [
      {name: 'T.Nagar', value: '1'},
      {name: 'Adyar', value: '2'},
      {name: 'Egmore', value: '3'},
      {name: 'George down', value: '4'},
      {name: 'Mylapore', value: '5'},
      {name: 'Perambore', value: '6'},
      {name: 'Periamedu', value: '7'},
      {name: 'Purasaiwalkkam', value: '8'},
      {name: 'Royapuram', value: '9'},
      {name: 'Triplicane', value: '10'},
  ];
  this.School = [
    {name: 'T.Nagar', value: '1'},
    {name: 'Adyar', value: '2'},
    {name: 'Egmore', value: '3'},
    {name: 'George down', value: '4'},
    {name: 'Mylapore', value: '5'},
    {name: 'Perambore', value: '6'},
    {name: 'Periamedu', value: '7'},
    {name: 'Purasaiwalkkam', value: '8'},
    {name: 'Royapuram', value: '9'},
    {name: 'Triplicane', value: '10'},
];
this.Teacher = [
  {name: 'T.Nagar', value: '1'},
  {name: 'Adyar', value: '2'},
  {name: 'Egmore', value: '3'},
  {name: 'George down', value: '4'},
  {name: 'Mylapore', value: '5'},
  {name: 'Perambore', value: '6'},
  {name: 'Periamedu', value: '7'},
  {name: 'Purasaiwalkkam', value: '8'},
  {name: 'Royapuram', value: '9'},
  {name: 'Triplicane', value: '10'},
];
this.Designing = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Knowledge = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Strategy = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Interpersonal = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Professional = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Schoolatte = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Teacheratten = [
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
];
this.Promoting =[
  {name: 'Below Expectations', value: '1'},
  {name: 'Closest to expectations', value: '2'},
  {name: 'Meets expectations', value: '3'},
  {name: 'Exceeds expectations', value: '4'}
]

   }

  ngOnInit() {
  }

}

