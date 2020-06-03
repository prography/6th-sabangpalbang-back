import {
  JsonController,
  Get,
} from 'routing-controllers'

const csvManager = require('../../module/csvManager')
import { Cocktail } from '../entity/Cocktail'
import { Tag } from '../entity/Tag'
import { CocktailHasTag } from '../entity/CocktailHasTag'
import { Flavor } from '../entity/Flavor'
import { CocktailHasFlavor } from '../entity/CocktailHasFlavor'


@JsonController('/init')
export class DBScriptController {
  @Get('/cocktails')
  public async cocktails() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      for (const element of cocktailArr) {
        const cocktailName = await Cocktail.findOneByName(element.name)
        if (!cocktailName) { // DB에 칵테일 중복값 없으면
          const cocktail = new Cocktail()
          cocktail.imgUrl = element.img_url
          cocktail.name = element.name
          cocktail.ingredients = element.ingredients
          cocktail.abv = element.abv
          // TODO: abvClassification Table 이랑 연동
          cocktail.abvClassificationIdx = element.abv_classification
          cocktail.description = element.description
          cocktail.nonAbv = element.nonAbv === 1

          // TODO: BASE Table 이랑 연동
          switch (element.base) {
          case '없음':
            cocktail.baseIdx = 1
            break
          case '데킬라':
            cocktail.baseIdx = 2
            break
          case '럼':
            cocktail.baseIdx = 3
            break
          case '진':
            cocktail.baseIdx = 4
            break
          case '리큐어':
            cocktail.baseIdx = 5
            break
          case '보드카':
            cocktail.baseIdx = 6
            break
          case '브랜디':
            cocktail.baseIdx = 7
            break
          default: // 기타
            cocktail.baseIdx = 8
            break
          }
          await Cocktail.save(cocktail)
        }
      }
    } catch (err) {
      console.log(err)
    }
    return 'cocktail T DBScript complete'
  }


  // Tag T
  @Get('/tags')
  public async insertTagData() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      const tagData = []
      for (const element of cocktailArr) {
        const tagArr = element.tag.split(', ')
        for (let i = 0; i < tagArr.length; i++) {
          const tagName = tagArr[i].trim()
          if (tagName.length && !tagData.includes(tagName)) {
            tagData.push(tagName)
          }
        }
      }

      for (const tagName of tagData) {
        const isAlreadyTagData = await Tag.findByName(tagName)
        if (!isAlreadyTagData) await Tag.saveData(tagName)
      }
    } catch (err) {
      return {
        isSuccessful: false,
        errorMsg: err,
      }
    }
    return {
      isSuccessful: true,
    }
  }


  // Cocktail has tag
  @Get('/cocktailHasTag')
  public async cocktailHasTag() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      for (const element of cocktailArr) {
        const cocktailIdx = (await Cocktail.find({
          where: { name: element.name },
        }))[0].idx

        if (cocktailIdx !== 0) {
          const tagArr = element.tag.split(', ')
          for (const element of tagArr) {
            const tagIdx = (await Tag.find({ where: { name: element } }))[0].idx
            if (cocktailIdx !== 0 && tagIdx !== 0) {
              const cocktailHasTag = new CocktailHasTag()
              cocktailHasTag.cocktailIdx = cocktailIdx
              cocktailHasTag.tagIdx = tagIdx
              await CocktailHasTag.save(cocktailHasTag)
            }
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
    return 'Tag T DBScript complete'
  }


  // Flavor T
  @Get('/flavors')
  public async flavors() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      let flavorData = []
      for (const element of cocktailArr) {
        const flavorArr = element.flavor.split(', ')
        for (let i = 0; i < flavorArr.length; i++) {
          flavorData.push(flavorArr[i])
        }
        flavorData.sort()
        flavorData = Array.from(new Set(flavorData))
      }

      for (const element of flavorData) {
        if (element.length) {
          const dd = await Flavor.find({ where: { name: element } })
          if (dd.length == 0) {
            const flavor = new Flavor()
            flavor.name = element
            await Flavor.save(flavor)
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
    return 'Flavor T DBScript complete'
  }


  // Cocktail has flavor
  @Get('/cocktailHasFlavor')
  public async cocktailHasFlavor() {
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      for (const element of cocktailArr) {
        const cocktailIdx = (await Cocktail.find({
          where: { name: element.name },
        }))[0].idx

        if (cocktailIdx !== 0) {
          const flavorArr = element.flavor.split(', ')
          for (const element of flavorArr) {
            const flavorIdx = (await Flavor.find({
              where: { name: element },
            }))[0].idx

            if (cocktailIdx !== 0 && flavorIdx !== 0) {
              const cocktailHasFlavor = new CocktailHasFlavor()
              cocktailHasFlavor.cocktailIdx = cocktailIdx
              cocktailHasFlavor.flavorIdx = flavorIdx
              await CocktailHasFlavor.save(cocktailHasFlavor)
            }
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
    return 'Flavor T DBScript complete'
  }
}
