
case class Boy(name: String) {
  println("Making boy: " + name)
}

case class Man(name: String) extends Boy(name) {
  println("Making man: Mr. " + name)
}

object Constance {
  def main(args: Array[String]) = {
    val boy = Boy("Ezra Nebuchadnezzar")
    val man = Man("Veronius Morton")
    println("Done")
  }
}

Constance.main(args)
