import { Args, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entitiy';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }
}
