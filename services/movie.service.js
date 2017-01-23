module.exports ={
    schema: {
         "id": 0,
         "name": "",
         "years": "",
         "genres": ""

     },
     formatMovie: function(id, name, years, genres) {

            this.schema.id = id;
            this.schema.name = name;
            this.schema.years = years;
            this.schema.genres = genres;

            return this.schema;

 }
}
