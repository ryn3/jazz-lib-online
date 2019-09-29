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

exports.getHome = (req, res) => {
    res.render("home")
}

exports.getYears = (req, res) => {
    yearArray = {
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
        '2018': 31,
        '?': 1,
        ' ': 7,
        '0000': 3
    }
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
    //Album.find({}, 'releases.release.released', function (err, years) {
        
    //    if (err) {
    //        console.log(err)
    //    } else {
    //        var yearArray = {}
    //        yearArray = {
    //            '1896': 1,
    //            '1898': 1,
    //            '1908': 1,
    //            '1910': 3,
    //            '1911': 1,
    //            '1912': 2,
    //            '1913': 3,
    //            '1914': 1,
    //            '1915': 2,
    //            '1916': 2,
    //            '1917': 4,
    //            '1918': 6,
    //            '1919': 8,
    //            '1920': 11,
    //            '1921': 11,
    //            '1922': 15,
    //            '1923': 26,
    //            '1924': 22,
    //            '1925': 29,
    //            '1926': 31,
    //            '1927': 52,
    //            '1928': 34,
    //            '1929': 50,
    //            '1930': 32,
    //            '1931': 23,
    //            '1932': 12,
    //            '1933': 16,
    //            '1934': 19,
    //            '1935': 32,
    //            '1936': 51,
    //            '1937': 80,
    //            '1938': 105,
    //            '1939': 129,
    //            '1940': 113,
    //            '1941': 156,
    //            '1942': 119,
    //            '1943': 58,
    //            '1944': 96,
    //            '1945': 166,
    //            '1946': 212,
    //            '1947': 247,
    //            '1948': 125,
    //            '1949': 194,
    //            '1950': 316,
    //            '1951': 297,
    //            '1952': 398,
    //            '1953': 537,
    //            '1954': 729,
    //            '1955': 1150,
    //            '1956': 1488,
    //            '1957': 1436,
    //            '1958': 1469,
    //            '1959': 1659,
    //            '1960': 1498,
    //            '1961': 1421,
    //            '1962': 1565,
    //            '1963': 1435,
    //            '1964': 1348,
    //            '1965': 1453,
    //            '1966': 1694,
    //            '1967': 1572,
    //            '1968': 1520,
    //            '1969': 1530,
    //            '1970': 1543,
    //            '1971': 1450,
    //            '1972': 1631,
    //            '1973': 1698,
    //            '1974': 1684,
    //            '1975': 1693,
    //            '1976': 1863,
    //            '1977': 1777,
    //            '1978': 1746,
    //            '1979': 1584,
    //            '1980': 1487,
    //            '1981': 1372,
    //            '1982': 1301,
    //            '1983': 1229,
    //            '1984': 1227,
    //            '1985': 1281,
    //            '1986': 1341,
    //            '1987': 1604,
    //            '1988': 1581,
    //            '1989': 1542,
    //            '1990': 1338,
    //            '1991': 1210,
    //            '1992': 1064,
    //            '1993': 1084,
    //            '1994': 1122,
    //            '1995': 1115,
    //            '1996': 1058,
    //            '1997': 1018,
    //            '1998': 940,
    //            '1999': 950,
    //            '2000': 1015,
    //            '2001': 943,
    //            '2002': 914,
    //            '2003': 991,
    //            '2004': 979,
    //            '2005': 969,
    //            '2006': 1029,
    //            '2007': 1000,
    //            '2008': 940,
    //            '2009': 903,
    //            '2010': 860,
    //            '2011': 917,
    //            '2012': 940,
    //            '2013': 1005,
    //            '2014': 981,
    //            '2015': 857,
    //            '2016': 406,
    //            '2017': 3,
    //            '2018': 31,
    //            '?': 1,
    //            ' ': 7,
    //            '0000': 3
    //        }
    //        years.forEach(function (year) {
    //            try {
    //                newYear = year._doc.releases.release.released.substring(0, 4)
    //                if (newYear in yearArray) {
    //                    yearArray[newYear]++
    //                } else {
    //                    yearArray[newYear] = 1
    //                }
                    
    //            } catch (e) {
    //            }
    //        })

    //        var keys = Object.keys(yearArray)
    //        keys.sort(function (a, b) { return yearArray[b] - yearArray[a] })
    //        values = []
    //        keys.forEach(function (key) {
    //            values.push(yearArray[key])
    //        })
    //        for (var i = 0; i < keys.length; i++) {
    //            //console.log(keys[i] + ": " + values[i])
    //        }
    //        //console.log(yearArray)

    //        decadeArray = {
    //            '1890s': 0, '1900s': 0, '1910s': 0, '1920s': 0, '1930s': 0,
    //            '1940s': 0, '1950s': 0, '1960s': 0, '1970s': 0, '1980s': 0,
    //            '1990s': 0, '2000s': 0, '2010s': 0
    //        }
    //        all = {
    //            'all':0
    //        }
    //        keys.forEach(function (year) {
    //            all['all'] += yearArray[year]
    //            yearCheck = String(year).substring(0, 3)
    //            yearCheckFromDecades = yearCheck + '0s'
    //            decadeArray[yearCheckFromDecades] += yearArray[year]
                
    //        })

    //        res.render('years', {
    //            title: 'years',
    //            //years: Object.keys(yearArray),
    //            //counts: Object.values(yearArray),
    //            yearsObj: yearArray,
    //            decadesObj: decadeArray,
    //            allObj: all,
    //            //yearsSorted: keys,
    //            //countsSorted: values,
    //        })
    //    }
    //})
};

//     

exports.postYears = (req, res) => {

    /**
      normalize year query  

    **/
    query = req.body.years
    qArray = query.split("; ")
    qArray.pop()
    newQuery = []
    qArray.forEach(function (item) {
        if (item.includes('s')) {
            decadeBase = item.substring(0, item.length - 2)
            for (var i = 0; i < 10; i++) {
                newQuery.push(decadeBase + String(i))
            }
        } else {
            newQuery.push(item)
        }
    })

    Album.find({
                'releases.release.released': { '$in': newQuery }
            }, 'releases.release.country', function (err, countries) {

                if (err) {
                    console.log(err)
                } else {
                    //console.log(countries)
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

                    all = {
                        'all': 0
                    }
                    Object.keys(countryArray).forEach(function (country) {
                        all['all'] += countryArray[country]
                    })

                    res.render('countries', {
                        title: 'Countries',
                        //years: Object.keys(yearArray),
                        //counts: Object.values(yearArray),
                        countriesObj: keysSorted,
                        countriesKVObj: countryArray,
                        allObj: all,
                        //yearsSorted: keys,
                        //countsSorted: values,
                    })
                }
            })

    

    console.log(newQuery)
    yearsArrayFinal = newQuery



}



exports.postCountries = (req, res) => {
    /**
      normalize country query  

    **/
    query = req.body.countries
    qArray = query.split("; ")
    qArray.pop()
    //console.log(qArray)
    countriesArrayFinal = qArray

    Album.find({
        'releases.release.country': { '$in': countriesArrayFinal },
        'releases.release.released': { '$in': yearsArrayFinal }
    }, 'releases.release.labels', function (err, labels) {

        if (err) {
            console.log(err)
        } else {
            //console.log(labels)
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
                title: 'Labels',
                labelsObj: keysSorted,
                labelsKVObj: labelArray,
                allObj: all,
            })
        }
    })
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

    Album.find({
        'releases.release.country': { '$in': countriesArrayFinal },
        'releases.release.released': { '$in': yearsArrayFinal },
        'releases.release.labels.label.@name': { '$in': labelsArrayFinal }
    }, 'releases.release', function (err, releases) {

        if (err) {
            console.log(err)
        } else {
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
                            roleArray[one_person] += ", "+person_role
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
            })
        }
    })


}

exports.postArtists = (req, res) => {
    /**
      normalize label query  

    **/
    query = req.body.artists
    qArray = query.split("; ")
    qArray.pop()
    //console.log(qArray)
    artistsArrayFinal = qArray

    Album.find({
        'releases.release.country': { '$in': countriesArrayFinal },
        'releases.release.released': { '$in': yearsArrayFinal },
        'releases.release.labels.label.@name': { '$in': labelsArrayFinal },
        'releases.release.extraartists.artist.name': {'$in': artistsArrayFinal}
    }, 'releases.release', function (err, titles) {

        if (err) {
            console.log(err)
        } else {
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
                    titlesArray[title] = artist+":  "+label+", "+country+ " " + year
                    
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
                hidden: hidden
            })
        }
    })

}

exports.postAlbum = (req, res) => {
    /**
      normalize label query  

    **/

    query = req.body.album
    //console.log(query)
    query = query.substring(0, query.length )
    var db = new Discogs().database();
    db.getRelease(parseInt(query), function (err, data) {
        console.log(data)
        res.render('info', {
            albumData: data
        })

    });

}

exports.getAbout = (req, res) => {
    res.render('/about')
}
