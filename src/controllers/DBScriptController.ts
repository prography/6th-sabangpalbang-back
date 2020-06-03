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
import { AbvClassification } from '../entity/AbvClassification'
import { Base } from '../entity/Base'

const NON_BASE_TEXT = '없음'
const ANOTHER_BASE_TEXT = '기타'

@JsonController('/init')
export class DBScriptController {
  @Get('/cocktails')
  public async cocktails() {
    await this.insertAbvClassification()
    await this.insertBase()
    await this.insertTagData()
    const nonBase = await Base.findDataForCocktail(NON_BASE_TEXT)
    const anotherBase = await Base.findDataForCocktail(ANOTHER_BASE_TEXT)
    try {
      const cocktailArr = await csvManager.read('cocktailData.csv')
      for (const element of cocktailArr) {
        const cocktailName = await Cocktail.findOneByName(element.name)
        if (!cocktailName) { // DB에 칵테일 중복값 없으면
          const cocktail = new Cocktail()
          // 기초 정보 삽입
          cocktail.imgUrl = element.img_url
          cocktail.name = element.name
          cocktail.ingredients = element.ingredients
          cocktail.abv = element.abv
          cocktail.description = element.description
          cocktail.nonAbv = element.nonAbv === 1
          // 도수 분류 정보
          const abvClassification = await AbvClassification.findDataForCocktail(element.abv)
          cocktail.abvClassification = abvClassification
          // 베이스 정보
          if (element.base === NON_BASE_TEXT) {
            cocktail.base = nonBase
          } else {
            const base = await Base.findDataForCocktail(element.base)
            // 베이스가 검색되지 않으면 기타
            if (!base) {
              cocktail.base = anotherBase
            } else {
              cocktail.base = base
            }
          }
          // 태그 정보
          const tagList = []
          const tagNameArr = element.tag.split(', ')
          for (let i = 0; i < tagNameArr.length; i++) {
            const tagName = tagNameArr[i].trim()
            const tag = await Tag.findByName(tagName)
            tagList.push(tag)
          }
          cocktail.tags = tagList
          await Cocktail.save(cocktail)
        }
      }
    } catch (err) {
      console.log(err)
    }
    return 'cocktail T DBScript complete'
  }

  async insertAbvClassification() {
    // TODO: desc 정하기
    const abvDesc = ['엥', '맥주~', '청하', '참이슬', '말리부', '리큐르', '예거', '앱솔루트', '오우..']
    for (let i = 0; i <= 40; i += 5) {
      if (i === 40) {
        await AbvClassification.saveData(i, 100, abvDesc[i / 5])
        continue
      }
      await AbvClassification.saveData(i, i + 4, abvDesc[i / 5])
    }
  }

  async insertBase() {
    const baseNameList = ['없음', '데킬라', '럼', '진', '리큐어', '보드카', '브랜디', '기타']
    const baseImgList = [
      'https://user-images.githubusercontent.com/49062985/83237242-cd20c300-a1cf-11ea-9f36-a3b52345d9bc.jpg',
      'https://user-images.githubusercontent.com/49062985/83227021-2ed83180-a1be-11ea-81f7-93c3eb99ba67.jpg',
      'https://user-images.githubusercontent.com/49062985/82726176-39597d80-9d1d-11ea-8c90-090fe67b352e.png',
      'https://user-images.githubusercontent.com/49062985/82726234-99e8ba80-9d1d-11ea-81f2-f13be5559a8b.png',
      'https://user-images.githubusercontent.com/49062985/83226553-38ad6500-a1bd-11ea-886d-ace9026ed754.jpg',
      'https://user-images.githubusercontent.com/49062985/83226647-6692a980-a1bd-11ea-9eec-a546a97c5229.jpg',
      'https://user-images.githubusercontent.com/49062985/83226713-90e46700-a1bd-11ea-91b0-9735fad7e361.jpg',
      'https://user-images.githubusercontent.com/49062985/83226826-ca1cd700-a1bd-11ea-859c-c1e2362111b0.jpg',
    ]
    let i = 0
    for (const baseName of baseNameList) {
      // TODO: 도수, 설명 추가
      await Base.saveData(baseImgList[i++], baseName, 40, '설명~')
    }
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
