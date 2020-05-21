const {JsonController, Param, Body, Get, Post, Put, Delete} = require("routing-controllers");

@JsonController()
export class UserController {

  @Get("/users")
  getAll() {
    return "This action returns all users";
  }

  @Post("/users")
  post(@Body() user) {
    return "Saving user...";
  }

}
