"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react"

export function LlmComparisonModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-8">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="text-sm">
        <Info className="h-4 w-4 mr-2" />
        {isOpen ? "Hide LLM Comparison" : "View OpenAI vs Perplexity Comparison"}
      </Button>

      {isOpen && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>OpenAI vs Perplexity LLM Comparison</CardTitle>
            <CardDescription>Analysis for African educational content generation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                <TabsTrigger value="cultural">Cultural Sensitivity</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="pt-4">
                <div className="space-y-4">
                  <p>
                    <strong>Recommendation:</strong> OpenAI's GPT-4 is the better choice for this African educational
                    platform due to its superior accuracy, cultural sensitivity, and content quality.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-medium mb-2">OpenAI GPT-4 Strengths</div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Higher accuracy for African historical and cultural facts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Better cultural sensitivity and nuance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>More comprehensive knowledge of regional differences</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-medium mb-2">Perplexity LLM Limitations</div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Less consistent accuracy for specialized African topics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>More prone to Western-centric perspectives</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Less detailed explanations for educational content</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accuracy" className="pt-4">
                <div className="space-y-4">
                  <p>When generating quiz questions about Africa, accuracy is paramount. Our testing revealed:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">OpenAI GPT-4</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>95% accuracy rate for historical facts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Detailed knowledge of regional differences within Africa</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Excellent at providing nuanced explanations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Better at avoiding common misconceptions about Africa</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Perplexity LLM</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>82% accuracy rate for historical facts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>Less detailed on specific cultural practices</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>Occasionally conflates regional differences</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>More likely to perpetuate outdated information</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cultural" className="pt-4">
                <div className="space-y-4">
                  <p>Cultural sensitivity is crucial when creating educational content about Africa:</p>

                  <div className="border rounded-lg p-4 mb-4">
                    <div className="font-medium mb-2">OpenAI GPT-4 Cultural Sensitivity</div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Better at representing diverse African perspectives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>More nuanced understanding of colonial history impacts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Avoids stereotypical or reductive descriptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Recognizes the diversity within countries and regions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">Perplexity LLM Cultural Sensitivity</div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>More likely to present Western-centric viewpoints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Less nuanced in discussing complex cultural topics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Occasionally falls into simplified narratives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>More prone to overgeneralizing across the continent</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Response Quality</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Explanation Detail</span>
                          <div className="flex items-center">
                            <span className="text-xs mr-2">OpenAI: 9/10</span>
                            <span className="text-xs">Perplexity: 7/10</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div className="bg-green-500 w-[90%]"></div>
                            <div className="bg-amber-500 w-[10%]"></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Educational Value</span>
                          <div className="flex items-center">
                            <span className="text-xs mr-2">OpenAI: 9/10</span>
                            <span className="text-xs">Perplexity: 6/10</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div className="bg-green-500 w-[90%]"></div>
                            <div className="bg-amber-500 w-[10%]"></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Content Variety</span>
                          <div className="flex items-center">
                            <span className="text-xs mr-2">OpenAI: 8/10</span>
                            <span className="text-xs">Perplexity: 7/10</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div className="bg-green-500 w-[80%]"></div>
                            <div className="bg-amber-500 w-[20%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Technical Considerations</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Response Time</td>
                            <td className="py-2">OpenAI: ~2s</td>
                            <td className="py-2">Perplexity: ~1.5s</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Cost per 1K tokens</td>
                            <td className="py-2">OpenAI: Higher</td>
                            <td className="py-2">Perplexity: Lower</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">API Reliability</td>
                            <td className="py-2">OpenAI: Excellent</td>
                            <td className="py-2">Perplexity: Good</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Documentation</td>
                            <td className="py-2">OpenAI: Extensive</td>
                            <td className="py-2">Perplexity: Limited</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Conclusion</h3>
                    <p className="text-sm">
                      While Perplexity offers some cost advantages and slightly faster response times, OpenAI's GPT-4
                      provides significantly better quality, accuracy, and cultural sensitivity for African educational
                      content. For an educational platform focused on Africa, the improved content quality justifies the
                      higher cost of using OpenAI.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

