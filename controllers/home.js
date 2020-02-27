/**
 * GET /
 * Home page.
 */
var Discogs = require('disconnect').Client;

var Album = require("../models/Album");
var yearsArrayFinal = [];
var countriesArrayFinal = [];
var labelsArrayFinal = [];
var artistsArrayFinal = [];
var allYears = {
    '1896': 1,
    '1898': 1,
    '1908': 1,
    '1910': 3,
    '1911': 1,
    '1912': 2,
    '1913': 3,
    '1914': 1,
    '1915': 2,
    '1916': 2,
    '1917': 4,
    '1918': 6,
    '1919': 8,
    '1920': 11,
    '1921': 11,
    '1922': 15,
    '1923': 26,
    '1924': 22,
    '1925': 29,
    '1926': 31,
    '1927': 52,
    '1928': 34,
    '1929': 50,
    '1930': 32,
    '1931': 23,
    '1932': 12,
    '1933': 16,
    '1934': 19,
    '1935': 32,
    '1936': 51,
    '1937': 80,
    '1938': 105,
    '1939': 129,
    '1940': 113,
    '1941': 156,
    '1942': 119,
    '1943': 58,
    '1944': 96,
    '1945': 166,
    '1946': 212,
    '1947': 247,
    '1948': 125,
    '1949': 194,
    '1950': 316,
    '1951': 297,
    '1952': 398,
    '1953': 537,
    '1954': 729,
    '1955': 1150,
    '1956': 1488,
    '1957': 1436,
    '1958': 1469,
    '1959': 1659,
    '1960': 1498,
    '1961': 1421,
    '1962': 1565,
    '1963': 1435,
    '1964': 1348,
    '1965': 1453,
    '1966': 1694,
    '1967': 1572,
    '1968': 1520,
    '1969': 1530,
    '1970': 1543,
    '1971': 1450,
    '1972': 1631,
    '1973': 1698,
    '1974': 1684,
    '1975': 1693,
    '1976': 1863,
    '1977': 1777,
    '1978': 1746,
    '1979': 1584,
    '1980': 1487,
    '1981': 1372,
    '1982': 1301,
    '1983': 1229,
    '1984': 1227,
    '1985': 1281,
    '1986': 1341,
    '1987': 1604,
    '1988': 1581,
    '1989': 1542,
    '1990': 1338,
    '1991': 1210,
    '1992': 1064,
    '1993': 1084,
    '1994': 1122,
    '1995': 1115,
    '1996': 1058,
    '1997': 1018,
    '1998': 940,
    '1999': 950,
    '2000': 1015,
    '2001': 943,
    '2002': 914,
    '2003': 991,
    '2004': 979,
    '2005': 969,
    '2006': 1029,
    '2007': 1000,
    '2008': 940,
    '2009': 903,
    '2010': 860,
    '2011': 917,
    '2012': 940,
    '2013': 1005,
    '2014': 981,
    '2015': 857,
    '2016': 406,
    '2017': 3,
    '2018': 31
}
var allCountries = {
    'US': 40722, 'UK': 9643, 'Germany': 8190, 'France': 4844, 'Italy': 3709, 'Japan': 3359, 'Europe': 2956, 'Netherlands': 2049,
    'Canada': 1819, 'Sweden': 993, 'Brazil': 926, 'Spain': 906, 'USSR': 848, 'Denmark': 804, 'Poland': 697, 'Switzerland': 673,
    'Australia': 648, 'Norway': 645, 'undefined': 538, 'Czechoslovakia': 512, 'Belgium': 491, 'Finland': 460, 'UK & Europe': 423,
    'Austria': 420, 'Russia': 342, 'Greece': 290, 'USA & Canada': 228, 'Yugoslavia': 205, 'Portugal': 199, 'German Democratic Republic (GDR)': 186,
    'Romania': 185, 'Hungary': 170, 'Argentina': 163, 'New Zealand': 152, 'Bulgaria': 123, 'Scandinavia': 119, 'South Africa': 114, 'Czech Republic': 99,
    'Mexico': 95, 'Cuba': 83, 'Turkey': 78, 'UK, Europe & US': 61, 'Nigeria': 61, 'Venezuela': 51, 'Benelux': 47, 'India': 45, 'Israel': 44, 'Lithuania': 42,
    'Colombia': 37, 'Iceland': 35, 'Germany, Austria, & Switzerland': 34, 'Hong Kong': 34, 'Croatia': 34, 'Chile': 34, 'UK & Ireland': 31,
    'South Korea': 27, 'Jamaica': 26, 'France & Benelux': 22, 'Australia & New Zealand': 22, 'Indonesia': 22, 'Serbia': 21,
    'Slovakia': 20, 'Ukraine': 19, 'UK & US': 18, 'Uruguay': 16, 'Taiwan': 16, 'Slovenia': 15, 'Lebanon': 15, 'Thailand': 15,
    'Singapore': 14, 'Peru': 14, 'Ireland': 14, 'Malaysia': 13, 'Luxembourg': 13, 'USA, Canada & Europe': 12, 'Trinidad & Tobago': 12,
    'USA, Canada & UK': 11, 'Macedonia': 11, 'Philippines': 11, 'Estonia': 10, 'Reunion': 10, 'Ethiopia': 10, 'USA & Europe': 9,
    'Serbia and Montenegro': 9, 'Puerto Rico': 9, 'North America(inc Mexico)': 7, 'Egypt': 7, 'Guadeloupe': 7, 'Senegal': 6,
    'Germany & Switzerland': 5, 'Faroe Islands': 5, 'Guinea': 5, 'Barbados': 5, 'Haiti': 4, 'Middle East': 4, 'Madagascar': 4,
    'UK & France': 3, 'Ghana': 3, 'Czech Republic & Slovakia': 3, 'Ivory Coast': 3, 'Pakistan': 3, 'UK, Europe & Japan': 3,
    'Asia': 3, 'Australasia': 3, 'Andorra': 3, 'Panama': 3, 'Kenya': 2, 'Martinique': 2, 'Monaco': 2, 'Latvia': 2, 'Dominican Republic': 2,
    'Congo, Democratic Republic of the': 2, 'United Arab Emirates': 2, 'China': 2, 'Protectorate of Bohemia and Moravia': 2, 'Bolivia': 2,
    'Costa Rica': 2, 'Singapore, Malaysia & Hong Kong': 2, 'Angola': 2, 'Cyprus': 2, 'Saint Vincent and the Grenadines': 1,
    'Kuwait': 1, 'Mongolia': 1, 'Nicaragua': 1, 'Zaire': 1, 'Zimbabwe': 1, 'Cambodia': 1, 'El Salvador': 1, 'Montenegro': 1, 'Morocco': 1,
    'Cape Verde': 1, 'Moldova, Republic of': 1, 'Guatemala': 1, 'Malta': 1, 'Saint Lucia': 1, 'Togo': 1
}
var countriesSorted = ['US', 'UK', 'Germany', 'France', 'Italy', 'Japan', 'Europe', 'Netherlands', 'Canada', 'Sweden', 'Brazil', 'Spain', 'USSR', 'Denmark', 'Poland', 'Switzerland', 'Australia', 'Norway', 'undefined', 'Czechoslovakia', 'Belgium', 'Finland', 'UK & Europe', 'Austria', 'Russia', 'Greece', 'USA & Canada', 'Yugoslavia', 'Portugal', 'German Democratic Republic (GDR)', 'Romania', 'Hungary', 'Argentina', 'New Zealand', 'Bulgaria', 'Scandinavia', 'South Africa', 'Czech Republic', 'Mexico', 'Cuba', 'Turkey', 'UK, Europe & US', 'Nigeria', 'Venezuela', 'Benelux', 'India', 'Israel', 'Lithuania', 'Colombia', 'Iceland', 'Germany, Austria, & Switzerland', 'Hong Kong', 'Croatia', 'Chile', 'UK & Ireland', 'South Korea', 'Jamaica', 'France & Benelux', 'Australia & New Zealand', 'Indonesia', 'Serbia', 'Slovakia', 'Ukraine', 'UK & US', 'Uruguay', 'Taiwan', 'Slovenia', 'Lebanon', 'Thailand', 'Singapore', 'Peru', 'Ireland', 'Malaysia', 'Luxembourg', 'USA, Canada & Europe', 'Trinidad & Tobago', 'USA, Canada & UK', 'Macedonia', 'Philippines', 'Estonia', 'Reunion', 'Ethiopia', 'USA & Europe', 'Serbia and Montenegro', 'Puerto Rico', 'North America (inc Mexico)', 'Egypt', 'Guadeloupe', 'Senegal', 'Germany & Switzerland', 'Faroe Islands', 'Guinea', 'Barbados', 'Haiti', 'Middle East', 'Madagascar', 'UK & France', 'Ghana', 'Czech Republic & Slovakia', 'Ivory Coast', 'Pakistan', 'UK, Europe & Japan', 'Asia', 'Australasia', 'Andorra', 'Panama', 'Kenya', 'Martinique', 'Monaco', 'Latvia', 'Dominican Republic', 'Congo, Democratic Republic of the', 'United Arab Emirates', 'China', 'Protectorate of Bohemia and Moravia', 'Bolivia', 'Costa Rica', 'Singapore, Malaysia & Hong Kong', 'Angola',
    'Cyprus', 'Saint Vincent and the Grenadines', 'Kuwait', 'Mongolia', 'Nicaragua', 'Zaire', 'Zimbabwe', 'Cambodia', 'El Salvador', 'Montenegro',
    'Morocco', 'Cape Verde', 'Moldova, Republic of', 'Guatemala', 'Malta', 'Saint Lucia', 'Togo']

exports.getHome = (req, res) => {
    yearArray = {
        '1957': 1436,
        '1958': 1469,
        '1959': 1659,
    }
    res.render('home', {
        title: "home",
        yearsObj: yearArray
    })
}

exports.getYears = (req, res) => {
    yearArray = allYears
    decadeArray = {
        '1890s': 0, '1900s': 0, '1910s': 0, '1920s': 0, '1930s': 0,
        '1940s': 0, '1950s': 0, '1960s': 0, '1970s': 0, '1980s': 0,
        '1990s': 0, '2000s': 0, '2010s': 0
    }
    all = {
        'all': 0
    }

    var keys = Object.keys(yearArray)
    keys.sort(function (a, b) { return yearArray[b] - yearArray[a] })
    values = []
    keys.forEach(function (key) {
        values.push(yearArray[key])
    })
    keys.forEach(function (year) {
        all['all'] += yearArray[year]
        yearCheck = String(year).substring(0, 3)
        yearCheckFromDecades = yearCheck + '0s'
        decadeArray[yearCheckFromDecades] += yearArray[year]

    })
    res.render('years', {
        title: 'years',
        //years: Object.keys(yearArray),
        //counts: Object.values(yearArray),
        yearsObj: yearArray,
        decadesObj: decadeArray,
        allObj: all,
        //yearsSorted: keys,
        //countsSorted: values,
    })

};

//     

exports.postYears = (req, res) => {

    /**
      normalize year query  

    **/
    query = req.body.years
    qArray = query.split("; ")
    qArray.pop()
    var newQuery = []
    qArray.forEach(function (item) {
        if (item.includes('0s')) {
            decadeBase = item.substring(0, item.length - 2)
            for (var i = 0; i < 10; i++) {
                newQuery.push(decadeBase + String(i))
            }
        } else {
            newQuery.push(item)
        }
    })


    if (!query.includes("(all selected)")) {
        Album.find({
            'releases.release.released': { '$in': newQuery }
		}, { 'releases.release.country': 1, '_id':0}, function (err, countries) {

                if (err) {
                    console.log(err)
                } else {
                    postYearsFunc(countries, newQuery, res)
                }
        })

    } else {
        //console.log('ALL SELECTED!')
        res.render('countries', {
            title: 'Countries',
            countriesObj: countriesSorted,
            countriesKVObj: allCountries,
            yearsQuery: newQuery.toString()
        })
    }


    //console.log(newQuery)
    yearsArrayFinal = newQuery

}

exports.postCountries = (req, res) => {
    /**
      normalize country query  

    **/
    var yearsQuery = req.body.years
    query = req.body.countries
    qArray = query.split("; ")
    qArray.pop()
    countriesArrayFinal = qArray
    console.log(countriesArrayFinal)
    var countriesQuery = qArray

    if (yearsQuery.includes("(all selected)") && query.includes("(all selected)")) {
        //console.log("*****case 1")
		Album.find({}, { 'releases.release.extraartists': 1, '_id': 0 }, function (err, releases) {
            if (err) {
                console.log(err)
            } else {
                postCountriesFunc(releases, countriesQuery, yearsQuery, res)

            }
        })
    } else if (query.includes("(all selected)") && !yearsQuery.includes("(all selected)")) {
        //console.log("*****case 2")
        Album.find({
            'releases.release.released': { '$in': yearsArrayFinal }
		}, { 'releases.release.extraartists': 1, '_id': 0 }, function (err, releases) {
            if (err) {
                console.log(err)
            } else {
                postCountriesFunc(releases, countriesQuery, yearsQuery, res)
            }
        })
    } else if (!query.includes("(all selected)") && yearsQuery.includes("(all selected)")) {
        //console.log("*****case 3")

        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal }
		}, { 'releases.release.extraartists': 1, '_id': 0 }, function (err, releases) {
            if (err) {
                console.log(err)
            } else {
                postCountriesFunc(releases, countriesQuery, yearsQuery, res)
            }
        })

    } else {
        //console.log("*****case 4")

        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.released': { '$in': yearsArrayFinal }
		}, { 'releases.release.extraartists':1, '_id':0}, function (err, releases) {
            if (err) {
                console.log(err)
            } else {
                postCountriesFunc(releases, countriesQuery, yearsQuery, res)
            }
        })

    }
}

exports.postArtists = (req, res) => {
    /**
      normalize label query  

    **/
    //console.log(req.body)
    var yearsQuery = req.body.years
    var countriesQuery = req.body.countries
    query = req.body.artists
    qArray = query.split("; ")
    qArray.pop()
    console.log('your selected artists: ')
    console.log(qArray)
    artistsArrayFinal = qArray

    if (yearsQuery.includes("(all selected)") && countriesQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release.labels', function (err, releases) {

            if (err) {
                console.log(err)
            } else {
                postArtistsFunc(releases, countriesArrayFinal, yearsArrayFinal, artistsArrayFinal, res)
            }
        })

    } else if (yearsQuery.includes("(all selected)") && !countriesQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release.labels', function (err, releases) {

            if (err) {
                console.log(err)
            } else {
                postArtistsFunc(releases, countriesArrayFinal, yearsArrayFinal, artistsArrayFinal, res)
            }
        })

    } else if (!yearsQuery.includes("(all selected)") && countriesQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.released': { '$in': yearsArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release.labels', function (err, releases) {

            if (err) {
                console.log(err)
            } else {
                postArtistsFunc(releases, countriesArrayFinal, yearsArrayFinal, artistsArrayFinal, res)
            }
        })
    }  else {
        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.released': { '$in': yearsArrayFinal },
            'releases.release.extraartists.artist.name': {'$in': artistsArrayFinal}
        }, 'releases.release.labels', function (err, releases) {

            if (err) {
                console.log(err)
            } else {
                postArtistsFunc(releases, countriesArrayFinal, yearsArrayFinal, artistsArrayFinal, res)
            }
        })
    }
}

exports.postLabels = (req, res) => {
    /**
      normalize label query  

    **/
    query = req.body.labels
    qArray = query.split("; ")
    qArray.pop()
    //console.log(qArray)
    labelsArrayFinal = qArray
    var yearsQuery = req.body.years
    var countriesQuery = req.body.countries
    var labelsQuery = qArray
    var artistsQuery = artistsArrayFinal

    if (!yearsQuery.includes("(all selected)") && !countriesQuery.includes("(all selected)") && !labelsQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.released': { '$in': yearsArrayFinal },
            'releases.release.labels.label.@name': { '$in': labelsArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })

    }
    else if (!yearsQuery.includes("(all selected)") && !countriesQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.released': { '$in': yearsArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })

    }
    else if (!yearsQuery.includes("(all selected)") && !labelsQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.labels.label.@name': { '$in': labelsArrayFinal },
            'releases.release.released': { '$in': yearsArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })


    }
    else if (!countriesQuery.includes("(all selected)") && !labelsQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.labels.label.@name': { '$in': labelsArrayFinal },
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })

    }
    else if (!yearsQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.released': { '$in': yearsArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })
    }
    else if (!countriesQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.country': { '$in': countriesArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })

    }
    else if (!labelsQuery.includes("(all selected)")) {
        Album.find({
            'releases.release.labels.label.@name': { '$in': labelsArrayFinal },
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })
    }
    else {

        Album.find({
            'releases.release.extraartists.artist.name': { '$in': artistsArrayFinal }
        }, 'releases.release', function (err, titles) {

            if (err) {
                console.log(err)
            } else {
                postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res)
            }
        })
    }

}

exports.postAlbum = (req, res) => {
    /**
      normalize label query  

    **/

    query = req.body.album

    var yearsQuery = req.body.years
    var countriesQuery = req.body.countries
    var labelsQuery = req.body.labels
    var artistsQuery = req.body.artists

    //console.log(query)
    query = query.substring(0, query.length )
    var db = new Discogs().database();
    db.getRelease(parseInt(query), function (err, data) {
        console.log(data)
        res.render('info', {
            albumData: data,
            yearsQuery: yearsQuery,
            countriesQuery: countriesQuery,
            labelsQuery: labelsQuery,
            artistsQuery: artistsQuery
        })

    });

}

exports.getAbout = (req, res) => {

}


function postYearsFunc(countries, newQuery, res) {
    var countryArray = {}
    countries.forEach(function (one_country) {
        try {
            newCountry = one_country._doc.releases.release.country
            if (newCountry in countryArray) {
                countryArray[newCountry]++
            } else {
                countryArray[newCountry] = 1
            }

        } catch (e) {
        }
    })
    var keysSorted = Object.keys(countryArray).sort(function (a, b) { return countryArray[b] - countryArray[a] })
    var allKeys = ''
    keysSorted.forEach(function (key) {
        allKeys += "'" + key + "', "
 
    })
    console.log(allKeys)
    all = {
        'all': 0
    }
    Object.keys(countryArray).forEach(function (country) {
        all['all'] += countryArray[country]
    })

    res.render('countries', {
        title: 'Countries',
        countriesObj: keysSorted,
        countriesKVObj: countryArray,
        allObj: all,
        yearsQuery: newQuery.toString()
    })

}

function postCountriesFunc(releases, countriesQuery, yearsQuery, res) {
    var personnelArray = {}
    var roleArray = {}
    releases.forEach(function (one_release) {
        try {
            newPersonnel = one_release._doc.releases.release.extraartists.artist
            newPersonnel.forEach(function (person) {
                one_person = person.name
                person_role = person.role
                //console.log('this is one_person: '+one_person)
                if (one_person in personnelArray) {
                    personnelArray[one_person]++

                    roleArray[one_person] += ", " + person_role

                } else {
                    personnelArray[one_person] = 1
                    roleArray[one_person] = person_role
                }
            })
        } catch (e) {

        }

    })

    var keysSorted = Object.keys(personnelArray).sort(function (a, b) { return personnelArray[b] - personnelArray[a] })
    var output = {}
    keysSorted.forEach(function (key) {
        output[key]
    })
    all = {
        'all': 0
    }
    keysSorted.forEach(function (artist) {
        all['all'] += personnelArray[artist]
    })
    
    res.render('artists', {
        title: 'Artists',
        //artistsObj: artistArray,
        personnelObj: keysSorted,
        personnelKVObj: roleArray,
        personnelObj2: personnelArray,
        allObj: all,
        yearsQuery: yearsQuery.toString(),
        countriesQuery: countriesQuery.toString(),
    })


    //
    //
    //



}


function postArtistsFunc(labels, countriesQuery, yearsQuery, artistsQuery, res) {
    console.log(labels)
    var labelArray = {}

    labels.forEach(function (one_label) {
        try {
            newLabel = one_label._doc.releases.release.labels.label['@name']
            if (newLabel == undefined) {
                //console.log("undefined label")
                newLabel = one_label._doc.releases.release.labels.label[0]['@name']
            }
            if (newLabel in labelArray) {
                labelArray[newLabel]++
            } else {
                labelArray[newLabel] = 1
            }

        } catch (e) {
        }
    })
    var keysSorted = Object.keys(labelArray).sort(function (a, b) { return labelArray[b] - labelArray[a] })

    all = {
        'all': 0
    }
    keysSorted.forEach(function (label) {
        all['all'] += labelArray[label]
    })


    res.render('labels', {
        title: 'labels',
        yearsQuery: yearsQuery,
        countriesQuery: countriesQuery,
        labelsKVObj: labelArray,
        labelsObj: keysSorted,
        artistsQuery: artistsQuery

    })



}

function postLabelsFunc(titles, labelsQuery, countriesQuery, yearsQuery, artistsQuery, res) {

    //console.log(titles)

    var titlesArray = {}
    var hidden = {}
    titles.forEach(function (one_title) {
        try {
            //console.log('this is one_person: ' + one_title)
            year = one_title._doc.releases.release.released.substring(0, 4)
            label = one_title._doc.releases.release.labels.label['@name']
            if (label == undefined) {
                //console.log("undefined label")
                label = one_title._doc.releases.release.labels.label[0]['@name']
            }
            country = one_title._doc.releases.release.country
            title = one_title._doc.releases.release.title
            artist = one_title._doc.releases.release.artists.artist.name

            if (artist == undefined) {
                console.log("undefined artist")
                artist = one_title._doc.releases.release.artists.artist[0].name
            }
            console.log(artist)
            id = one_title._doc.releases.release['@id']
            //console.log('this is title: '+title)
            hidden[title] = id
            titlesArray[title] = artist + ":  " + label + ", " + country + " " + year

        } catch (e) {
        }
    })

    var keysSorted = Object.keys(titlesArray).sort(function (a, b) { return titlesArray[b] - titlesArray[a] })
    var output = {}
    keysSorted.forEach(function (key) {
        output[key]
    })
    all = {
        'all': 0
    }
    keysSorted.forEach(function (artist) {
        all['all'] += titlesArray[artist]
    })

    res.render('albums', {
        title: 'albums',
        albumsObj: titlesArray,
        hidden: hidden,
        yearsQuery: yearsQuery,
        countriesQuery: countriesQuery,
        labelsQuery: labelsQuery,
        artistsQuery: artistsQuery

    })


}

